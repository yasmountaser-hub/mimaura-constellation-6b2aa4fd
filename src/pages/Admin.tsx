import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

type WaitlistEntry = {
  id: string;
  email: string;
  name: string | null;
  source: string | null;
  created_at: string;
};

const Admin = () => {
  const { user, loading: authLoading } = useAuth();
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setLoading(false);
      return;
    }
    (async () => {
      const { data, error } = await supabase
        .from("waitlist")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) setError(error.message);
      else setEntries(data ?? []);
      setLoading(false);
    })();
  }, [user, authLoading]);

  const exportCsv = () => {
    const header = "email,name,source,created_at\n";
    const rows = entries
      .map(
        (e) =>
          `${e.email},${(e.name ?? "").replace(/,/g, " ")},${e.source ?? ""},${e.created_at}`,
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
          {entries.length > 0 && (
            <Button variant="hero" size="sm" onClick={exportCsv}>
              Export CSV
            </Button>
          )}
        </div>

        {authLoading || loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : !user ? (
          <div className="glass-card rounded-2xl p-8 text-center">
            <p className="mb-4">You need to sign in to view the waitlist.</p>
            <Link to="/auth">
              <Button variant="hero">Sign In</Button>
            </Link>
          </div>
        ) : error ? (
          <div className="glass-card rounded-2xl p-8">
            <p className="text-destructive mb-2">{error}</p>
            <p className="text-sm text-muted-foreground">
              Only admins can view this page. Ask your team to grant you the
              admin role.
            </p>
          </div>
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
