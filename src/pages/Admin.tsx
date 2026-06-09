import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Check, X, Trash2, Hourglass, Loader2 } from "lucide-react";
import { toast } from "sonner";

type WaitlistEntry = {
  id: string;
  email: string;
  name: string | null;
  source: string | null;
  created_at: string;
};

type PendingPost = {
  id: string;
  user_id: string;
  body: string;
  tags: string[];
  likes: number;
  replies: number;
  created_at: string;
  status: "pending" | "approved" | "rejected";
  profiles: { display_name: string; avatar_emoji: string } | null;
};

const STORAGE_KEY = "mimaura_admin_pw";

const Admin = () => {
  const [password, setPassword] = useState("");
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [posts, setPosts] = useState<PendingPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<"waitlist" | "community">("community");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [communityFilter, setCommunityFilter] =
    useState<"pending" | "approved" | "rejected" | "all">("pending");

  const loadAll = async (pw: string) => {
    setLoading(true);
    setError(null);
    const [waitlistRes, communityRes] = await Promise.all([
      supabase.functions.invoke("admin-waitlist", {
        headers: { "x-admin-password": pw },
      }),
      supabase.functions.invoke("admin-community", {
        headers: { "x-admin-password": pw },
        body: { action: "list" },
      }),
    ]);
    setLoading(false);

    const wErr =
      waitlistRes.error ||
      (waitlistRes.data && (waitlistRes.data as any).error);
    if (wErr) {
      setError(
        (waitlistRes.data as any)?.error ??
          waitlistRes.error?.message ??
          "Failed to load",
      );
      sessionStorage.removeItem(STORAGE_KEY);
      setAuthed(false);
      return;
    }
    setEntries((waitlistRes.data as any).entries ?? []);
    setPosts(((communityRes.data as any)?.posts ?? []) as PendingPost[]);
    setAuthed(true);
    sessionStorage.setItem(STORAGE_KEY, pw);
  };

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      setPassword(stored);
      loadAll(stored);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim()) loadAll(password.trim());
  };

  const exportCsv = () => {
    const csvCell = (val: string | null | undefined) => {
      let v = (val ?? "").toString();
      if (/^[=+\-@\t\r]/.test(v)) v = `'${v}`;
      return `"${v.replace(/"/g, '""')}"`;
    };
    const header = "email,name,source,created_at\n";
    const rows = entries
      .map((e) =>
        [e.email, e.name, e.source, e.created_at].map(csvCell).join(","),
      )
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `mimaura-waitlist-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const moderate = async (
    id: string,
    action: "approve" | "reject" | "delete",
  ) => {
    setBusyId(id);
    const { data, error } = await supabase.functions.invoke(
      "admin-community",
      {
        headers: { "x-admin-password": password },
        body: { action, id },
      },
    );
    setBusyId(null);
    if (error || (data as any)?.error) {
      toast.error((data as any)?.error ?? error?.message ?? "Action failed");
      return;
    }
    if (action === "delete") {
      setPosts((ps) => ps.filter((p) => p.id !== id));
      toast.success("Deleted");
    } else {
      setPosts((ps) =>
        ps.map((p) =>
          p.id === id
            ? { ...p, status: action === "approve" ? "approved" : "rejected" }
            : p,
        ),
      );
      toast.success(action === "approve" ? "Approved 💜" : "Rejected");
    }
  };

  const signOut = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setAuthed(false);
    setPassword("");
    setEntries([]);
    setPosts([]);
  };

  const filteredPosts =
    communityFilter === "all"
      ? posts
      : posts.filter((p) => p.status === communityFilter);
  const pendingCount = posts.filter((p) => p.status === "pending").length;

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-28 pb-20 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold">
              Mimaura <span className="text-gradient">Admin</span>
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Manage the waitlist and approve community threads 💜
            </p>
          </div>
          {authed && (
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={signOut}>
                Sign Out
              </Button>
              {tab === "waitlist" && entries.length > 0 && (
                <Button variant="hero" size="sm" onClick={exportCsv}>
                  Export CSV
                </Button>
              )}
            </div>
          )}
        </div>

        {!authed ? (
          <form
            onSubmit={handleSubmit}
            className="glass-card rounded-2xl p-8 max-w-md mx-auto space-y-4"
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Lock className="w-4 h-4" /> Enter admin password
            </div>
            <Input
              type="password"
              placeholder="Admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            {error && <p className="text-destructive text-sm">{error}</p>}
            <Button
              type="submit"
              variant="hero"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Checking..." : "Unlock"}
            </Button>
          </form>
        ) : (
          <>
            {/* Tabs */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setTab("community")}
                className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  tab === "community"
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "bg-card border border-border/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                Community
                {pendingCount > 0 && (
                  <span className="ml-2 inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-yellow-400/20 text-yellow-700 dark:text-yellow-300 text-[10px] font-bold">
                    <Hourglass className="w-2.5 h-2.5" />
                    {pendingCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setTab("waitlist")}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  tab === "waitlist"
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "bg-card border border-border/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                Waitlist ({entries.length})
              </button>
            </div>

            {loading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : tab === "waitlist" ? (
              entries.length === 0 ? (
                <p className="text-muted-foreground">No signups yet.</p>
              ) : (
                <div className="glass-card rounded-2xl overflow-hidden">
                  <div className="px-6 py-4 border-b border-primary/10 text-sm text-muted-foreground">
                    {entries.length}{" "}
                    {entries.length === 1 ? "signup" : "signups"}
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-primary/5 text-left">
                        <tr>
                          <th className="px-6 py-3 font-medium">Email</th>
                          <th className="px-6 py-3 font-medium">Name</th>
                          <th className="px-6 py-3 font-medium">Source</th>
                          <th className="px-6 py-3 font-medium">Joined</th>
                        </tr>
                      </thead>
                      <tbody>
                        {entries.map((e) => (
                          <tr
                            key={e.id}
                            className="border-t border-primary/5"
                          >
                            <td className="px-6 py-3">{e.email}</td>
                            <td className="px-6 py-3">{e.name ?? "—"}</td>
                            <td className="px-6 py-3 text-muted-foreground">
                              {e.source ?? "—"}
                            </td>
                            <td className="px-6 py-3 text-muted-foreground">
                              {new Date(e.created_at).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )
            ) : (
              <>
                <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
                  {(["pending", "approved", "rejected", "all"] as const).map(
                    (f) => (
                      <button
                        key={f}
                        onClick={() => setCommunityFilter(f)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize whitespace-nowrap transition-all ${
                          communityFilter === f
                            ? "bg-primary/15 text-primary border border-primary/30"
                            : "bg-card border border-border/40 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {f}
                      </button>
                    ),
                  )}
                </div>

                {filteredPosts.length === 0 ? (
                  <div className="glass-card rounded-2xl p-10 text-center text-muted-foreground">
                    Nothing {communityFilter === "all" ? "here yet" : `in ${communityFilter}`}.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredPosts.map((p) => (
                      <div
                        key={p.id}
                        className={`glass-card rounded-2xl p-4 ${
                          p.status === "pending"
                            ? "ring-1 ring-yellow-400/40"
                            : p.status === "rejected"
                              ? "ring-1 ring-destructive/30 opacity-70"
                              : ""
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className="text-lg">
                            {p.profiles?.avatar_emoji ?? "🌸"}
                          </span>
                          <span className="text-sm font-semibold">
                            {p.profiles?.display_name ?? "Anonymous"}
                          </span>
                          <span className="text-[11px] text-muted-foreground">
                            {new Date(p.created_at).toLocaleString()}
                          </span>
                          <span
                            className={`ml-auto px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              p.status === "pending"
                                ? "bg-yellow-400/15 text-yellow-700 dark:text-yellow-300"
                                : p.status === "approved"
                                  ? "bg-emerald-400/15 text-emerald-700 dark:text-emerald-300"
                                  : "bg-destructive/15 text-destructive"
                            }`}
                          >
                            {p.status}
                          </span>
                        </div>
                        <p className="text-sm text-foreground whitespace-pre-wrap mb-3">
                          {p.body}
                        </p>
                        {p.tags?.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {p.tags.map((t) => (
                              <span
                                key={t}
                                className="px-2 py-0.5 rounded-full bg-muted/40 text-[10px] font-medium text-muted-foreground"
                              >
                                #{t}
                              </span>
                            ))}
                          </div>
                        )}
                        <div className="flex flex-wrap gap-2 pt-2 border-t border-border/20">
                          {p.status !== "approved" && (
                            <Button
                              size="sm"
                              variant="hero"
                              onClick={() => moderate(p.id, "approve")}
                              disabled={busyId === p.id}
                            >
                              {busyId === p.id ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                <Check className="w-3.5 h-3.5" />
                              )}
                              Approve
                            </Button>
                          )}
                          {p.status !== "rejected" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => moderate(p.id, "reject")}
                              disabled={busyId === p.id}
                            >
                              <X className="w-3.5 h-3.5" />
                              Reject
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            className="ml-auto text-destructive hover:bg-destructive/10"
                            onClick={() => {
                              if (confirm("Permanently delete this post?"))
                                moderate(p.id, "delete");
                            }}
                            disabled={busyId === p.id}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
