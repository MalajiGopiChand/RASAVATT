import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RASAVATT | Dream it. Design it. Wear it.",
  description: "Discover Indian fashion, meet independent designers, and create an outfit that tells your story.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
