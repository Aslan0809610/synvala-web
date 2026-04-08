import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Synvala — Desktop Lab Notebook for Organic Chemistry",
  description: "Synvala is a powerful desktop lab notebook designed for organic chemists. Plan reactions, track screening results, generate SI text, and export publication-ready data.",
  keywords: "lab notebook, organic chemistry, ELN, electronic lab notebook, SI export, substrate scope, reaction screening",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, fontFamily: "'Inter', system-ui, sans-serif", background: "#0a0a0a", color: "#e5e5e5" }}>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}

function Nav() {
  return (
    <nav style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "16px 40px", borderBottom: "1px solid #222",
      position: "sticky", top: 0, background: "rgba(10,10,10,0.9)", backdropFilter: "blur(8px)", zIndex: 100,
    }}>
      <a href="/" style={{ fontSize: 22, fontWeight: 700, color: "#f5c518", textDecoration: "none", letterSpacing: "-0.5px" }}>
        Synvala
      </a>
      <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
        <a href="/pricing" style={{ color: "#999", textDecoration: "none", fontSize: 14 }}>Pricing</a>
        <a href="/download" style={{ color: "#999", textDecoration: "none", fontSize: 14 }}>Download</a>
        <a href="https://github.com" style={{ color: "#999", textDecoration: "none", fontSize: 14 }}>GitHub</a>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer style={{
      padding: "40px", textAlign: "center", borderTop: "1px solid #222",
      color: "#666", fontSize: 13,
    }}>
      <p>&copy; {new Date().getFullYear()} Synvala. Built for organic chemists.</p>
    </footer>
  );
}
