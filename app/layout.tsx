import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Synvala — Desktop Lab Notebook for Organic Chemistry",
  description: "Plan reactions, screen conditions, track substrate scope, and export publication-ready SI. A powerful desktop app built for organic chemists.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <nav className="nav">
          <a href="/" className="nav-logo">Synvala</a>
          <div className="nav-links">
            <a href="/pricing" className="nav-link">Pricing</a>
            <a href="/download" className="nav-link">Download</a>
            <a href="/activate" className="nav-link">Activate</a>
            <a href="/download" className="nav-cta">Get Started</a>
          </div>
        </nav>
        {children}
        <footer className="footer">
          <div className="footer-links">
            <a href="/pricing">Pricing</a>
            <a href="/download">Download</a>
            <a href="/activate">Activate License</a>
          </div>
          <p>&copy; {new Date().getFullYear()} Synvala. Built for organic chemists.</p>
        </footer>
      </body>
    </html>
  );
}
