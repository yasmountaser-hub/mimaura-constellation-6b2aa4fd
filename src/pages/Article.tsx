import { motion } from "framer-motion";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingParticles from "@/components/FloatingParticles";
import CursorGlow from "@/components/CursorGlow";
import AccessibilityPanel from "@/components/AccessibilityPanel";
import { getArticle } from "@/data/articles";

const renderContent = (content: string) => {
  const blocks = content.trim().split(/\n\n+/);
  return blocks.map((block, i) => {
    const trimmed = block.trim();
    if (trimmed.startsWith("## ")) {
      return (
        <h2
          key={i}
          className="font-display text-2xl sm:text-3xl font-bold text-foreground mt-10 mb-4"
        >
          {trimmed.replace(/^##\s+/, "")}
        </h2>
      );
    }
    if (trimmed.startsWith("- ")) {
      const items = trimmed.split("\n").map((l) => l.replace(/^-\s+/, ""));
      return (
        <ul
          key={i}
          className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed mb-6"
        >
          {items.map((it, j) => (
            <li key={j}>{renderInline(it)}</li>
          ))}
        </ul>
      );
    }
    return (
      <p
        key={i}
        className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-5"
      >
        {renderInline(trimmed)}
      </p>
    );
  });
};

const renderInline = (text: string) => {
  // bold **x**
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) =>
    p.startsWith("**") && p.endsWith("**") ? (
      <strong key={i} className="text-foreground font-semibold">
        {p.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{p}</span>
    ),
  );
};

const Article = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticle(slug) : undefined;

  if (!article) return <Navigate to="/resources" replace />;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.category,
    author: { "@type": "Organization", name: "Mimaura" },
    publisher: { "@type": "Organization", name: "Mimaura" },
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <FloatingParticles />
      <CursorGlow />
      <Header />
      <AccessibilityPanel />

      <main className="pt-28 pb-20 px-4 sm:px-6">
        <article className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link
              to="/resources"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Learning Corner
            </Link>

            <span className="text-5xl mb-4 block">{article.emoji}</span>
            <span className="text-[11px] font-bold uppercase tracking-widest text-primary">
              {article.category}
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4 leading-tight">
              {article.title}
            </h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-10">
              <Clock className="w-4 h-4" />
              {article.readTime} read
            </div>

            <div className="glass-card rounded-3xl p-6 sm:p-10">
              {renderContent(article.content)}
            </div>

            <div className="mt-10 text-center">
              <Link
                to="/#waitlist"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-primary-foreground"
                style={{ background: "var(--gradient-button)" }}
              >
                Join the Waitlist ✨
              </Link>
            </div>
          </motion.div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default Article;
