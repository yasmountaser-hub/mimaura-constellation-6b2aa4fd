/**
 * Live security/RLS regression suite.
 *
 * These tests run against the real Supabase project (using only the public
 * anon key) to verify that:
 *   - Row Level Security policies actually block what they should
 *   - The waitlist INSERT WITH CHECK rejects malformed emails / oversized data
 *   - Sensitive tables (waitlist, user_roles) are not readable by anon
 *   - The admin-waitlist edge function refuses unauthenticated calls
 *
 * They are read-only except for the waitlist (we insert and then delete via
 * the admin edge function path is not used here — we just insert a uniquely
 * tagged email that the admin can prune if desired).
 */

import { describe, it, expect, beforeAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

let anon: SupabaseClient;

beforeAll(() => {
  expect(SUPABASE_URL, "VITE_SUPABASE_URL missing").toBeTruthy();
  expect(SUPABASE_ANON_KEY, "VITE_SUPABASE_PUBLISHABLE_KEY missing").toBeTruthy();
  anon = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
});

// ---------------------------------------------------------------------------
// Waitlist
// ---------------------------------------------------------------------------
describe("waitlist RLS + validation", () => {
  it("anon CANNOT read the waitlist", async () => {
    const { data, error } = await anon.from("waitlist").select("*").limit(1);
    // Either RLS denies (data is []) or grant denies (error). Both are acceptable.
    expect(error !== null || (Array.isArray(data) && data.length === 0)).toBe(true);
  });

  it("rejects a malformed email", async () => {
    const { error } = await anon
      .from("waitlist")
      .insert({ email: "not-an-email", name: "Test" });
    expect(error).not.toBeNull();
  });

  it("rejects an empty email", async () => {
    const { error } = await anon.from("waitlist").insert({ email: "" });
    expect(error).not.toBeNull();
  });

  it("rejects an oversized name (>100 chars)", async () => {
    const { error } = await anon.from("waitlist").insert({
      email: `sec-test-${Date.now()}@example.com`,
      name: "x".repeat(101),
    });
    expect(error).not.toBeNull();
  });

  it("rejects an oversized email (>255 chars)", async () => {
    const local = "a".repeat(250);
    const { error } = await anon
      .from("waitlist")
      .insert({ email: `${local}@example.com` });
    expect(error).not.toBeNull();
  });

  it("accepts a well-formed signup", async () => {
    const email = `sec-test+${Date.now()}@example.com`;
    const { error } = await anon
      .from("waitlist")
      .insert({ email, name: "Security Test", source: "vitest" });
    expect(error).toBeNull();
  });

  it("anon CANNOT update existing waitlist rows", async () => {
    const { error } = await anon
      .from("waitlist")
      .update({ name: "hacked" })
      .eq("source", "vitest");
    expect(error).not.toBeNull();
  });

  it("anon CANNOT delete waitlist rows", async () => {
    const { error } = await anon
      .from("waitlist")
      .delete()
      .eq("source", "vitest");
    expect(error).not.toBeNull();
  });
});

// ---------------------------------------------------------------------------
// user_roles — must never leak to anon, must never be writable by clients
// ---------------------------------------------------------------------------
describe("user_roles is locked down", () => {
  it("anon CANNOT read user_roles", async () => {
    const { data, error } = await anon.from("user_roles").select("*").limit(1);
    expect(error !== null || (Array.isArray(data) && data.length === 0)).toBe(true);
  });

  it("anon CANNOT insert into user_roles", async () => {
    const { error } = await anon
      .from("user_roles")
      .insert({ user_id: "00000000-0000-0000-0000-000000000000", role: "admin" });
    expect(error).not.toBeNull();
  });

  it("anon CANNOT update user_roles", async () => {
    const { error } = await anon
      .from("user_roles")
      .update({ role: "admin" })
      .neq("id", "00000000-0000-0000-0000-000000000000");
    expect(error).not.toBeNull();
  });

  it("anon CANNOT delete from user_roles", async () => {
    const { error } = await anon
      .from("user_roles")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000");
    expect(error).not.toBeNull();
  });
});

// ---------------------------------------------------------------------------
// Community tables — public READ is intentional, writes must require auth
// ---------------------------------------------------------------------------
describe("community tables — writes require auth", () => {
  it("anon CAN read circle_posts (public feed)", async () => {
    const { error } = await anon.from("circle_posts").select("id").limit(1);
    expect(error).toBeNull();
  });

  it("anon CANNOT insert circle_posts", async () => {
    const { error } = await anon
      .from("circle_posts")
      .insert({ user_id: "00000000-0000-0000-0000-000000000000", body: "spam" });
    expect(error).not.toBeNull();
  });

  it("anon CANNOT insert circle_replies", async () => {
    const { error } = await anon.from("circle_replies").insert({
      user_id: "00000000-0000-0000-0000-000000000000",
      post_id: "00000000-0000-0000-0000-000000000000",
      body: "spam",
    });
    expect(error).not.toBeNull();
  });

  it("anon CANNOT insert community_experiences", async () => {
    const { error } = await anon.from("community_experiences").insert({
      user_id: "00000000-0000-0000-0000-000000000000",
      glossary_term: "test",
      body: "spam",
    });
    expect(error).not.toBeNull();
  });

  // For RLS-protected DELETE/UPDATE, PostgREST returns 200 with 0 rows when
  // the USING clause excludes everything. We assert that NO rows were touched.
  it("anon DELETE on circle_posts affects 0 rows", async () => {
    const { data, error } = await anon
      .from("circle_posts")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000")
      .select();
    expect(error).toBeNull();
    expect(data ?? []).toEqual([]);
  });

  it("anon UPDATE on circle_posts affects 0 rows", async () => {
    const { data, error } = await anon
      .from("circle_posts")
      .update({ body: "hacked" })
      .neq("id", "00000000-0000-0000-0000-000000000000")
      .select();
    expect(error).toBeNull();
    expect(data ?? []).toEqual([]);
  });
});


// ---------------------------------------------------------------------------
// profiles — public READ by design, but only owner can mutate
// ---------------------------------------------------------------------------
describe("profiles", () => {
  it("anon CANNOT insert a profile for someone else", async () => {
    const { error } = await anon.from("profiles").insert({
      user_id: "00000000-0000-0000-0000-000000000000",
      display_name: "Imposter",
    });
    expect(error).not.toBeNull();
  });

  it("anon UPDATE on profiles affects 0 rows", async () => {
    const { data, error } = await anon
      .from("profiles")
      .update({ display_name: "Hacked" })
      .neq("id", "00000000-0000-0000-0000-000000000000")
      .select();
    expect(error).toBeNull();
    expect(data ?? []).toEqual([]);
  });
});


// ---------------------------------------------------------------------------
// Admin edge function — must reject calls without the admin password
// ---------------------------------------------------------------------------
describe("admin-waitlist edge function", () => {
  const url = `${SUPABASE_URL}/functions/v1/admin-waitlist`;

  it("rejects calls with no admin password header", async () => {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        apikey: SUPABASE_ANON_KEY,
      },
    });
    const body = await res.json().catch(() => ({}));
    expect(res.status).toBe(401);
    expect(body.error).toBeTruthy();
  });

  it("rejects calls with a wrong admin password", async () => {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        apikey: SUPABASE_ANON_KEY,
        "x-admin-password": "definitely-not-the-password",
      },
    });
    const body = await res.json().catch(() => ({}));
    expect(res.status).toBe(401);
    expect(body.error).toBeTruthy();
  });

  it("does NOT leak waitlist contents on auth failure", async () => {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        apikey: SUPABASE_ANON_KEY,
      },
    });
    const body = await res.json().catch(() => ({}));
    expect(body.entries).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// GraphQL surface must be removed (REST-only project)
// ---------------------------------------------------------------------------
describe("GraphQL is disabled", () => {
  it("graphql endpoint is not callable by anon", async () => {
    const res = await fetch(`${SUPABASE_URL}/graphql/v1`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        apikey: SUPABASE_ANON_KEY,
      },
      body: JSON.stringify({ query: "{ __schema { types { name } } }" }),
    });
    await res.text().catch(() => "");
    // Expect not a 200 with introspection data
    expect([400, 401, 403, 404, 500, 503]).toContain(res.status);
  });
});
