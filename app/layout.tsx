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
            <a href="/docs" className="nav-link">Docs</a>
            <a href="/gallery" className="nav-link">Gallery</a>
            <a href="/compare" className="nav-link">Compare</a>
            <a href="/pricing" className="nav-link">Pricing</a>
            <a href="/roadmap" className="nav-link">Roadmap</a>
            <a href="/changelog" className="nav-link">Changelog</a>
            <a href="/download" className="nav-link">Download</a>
            <a href="/activate" className="nav-link">Activate</a>
            <a href="/download" className="nav-cta">Get Started</a>
          </div>
        </nav>
        {children}
        <footer className="footer">
          <div className="footer-links">
            <a href="/docs">Docs</a>
            <a href="/gallery">Gallery</a>
            <a href="/compare">Compare</a>
            <a href="/pricing">Pricing</a>
            <a href="/roadmap">Roadmap</a>
            <a href="/changelog">Changelog</a>
            <a href="/download">Download</a>
            <a href="/activate">Activate License</a>
            <a href="mailto:jjj3789tw@gmail.com">Contact</a>
            <a href="https://github.com/Aslan0809610/synvala/issues" target="_blank" rel="noopener noreferrer">Report a Bug</a>
          </div>
          <p>&copy; {new Date().getFullYear()} Synvala. Built for organic chemists.</p>
        </footer>
      </body>
    </html>
  );
}
