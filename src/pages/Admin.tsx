import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";

type WaitlistEntry = {
  id: string;
  email: string;
  name: string | null;
  source: string | null;
  created_at: string;
};

const STORAGE_KEY = "mimaura_admin_pw";

const Admin = () => {
  const [password, setPassword] = useState("");
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authed, setAuthed] = useState(false);

  const fetchEntries = async (pw: string) => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.functions.invoke("admin-waitlist", {
      headers: { "x-admin-password": pw },
    });
    setLoading(false);
    if (error || (data && (data as any).error)) {
      setError((data as any)?.error ?? error?.message ?? "Failed to load");
      sessionStorage.removeItem(STORAGE_KEY);
      setAuthed(false);
      return;
    }
    setEntries((data as any).entries ?? []);
    setAuthed(true);
    sessionStorage.setItem(STORAGE_KEY, pw);
  };

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      setPassword(stored);
      fetchEntries(stored);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim()) fetchEntries(password.trim());
  };

  const exportCsv = () => {
    // Sanitize against CSV formula injection: prefix risky values with a single
    // quote, then quote-wrap and escape embedded quotes so spreadsheet apps
    // (Excel/LibreOffice/Sheets) treat every cell as plain text.
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

  const signOut = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setAuthed(false);
    setPassword("");
    setEntries([]);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-28 pb-20 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold">
              Waitlist <span className="text-gradient">Admin</span>
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              People who signed up to meet Mimi 💜
            </p>
          </div>
          {authed && entries.length > 0 && (
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={signOut}>
                Sign Out
              </Button>
              <Button variant="hero" size="sm" onClick={exportCsv}>
                Export CSV
              </Button>
            </div>
          )}
        </div>

        {!authed ? (
          <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 max-w-md mx-auto space-y-4">
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
            <Button type="submit" variant="hero" className="w-full" disabled={loading}>
              {loading ? "Checking..." : "Unlock"}
            </Button>
          </form>
        ) : loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : entries.length === 0 ? (
          <p className="text-muted-foreground">No signups yet.</p>
        ) : (
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-primary/10 text-sm text-muted-foreground">
              {entries.length} {entries.length === 1 ? "signup" : "signups"}
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
                    <tr key={e.id} className="border-t border-primary/5">
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
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
