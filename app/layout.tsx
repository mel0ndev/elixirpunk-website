import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Elixirpunk - Coming Soon",
  description: "Sign up for the Elixirpunk mailing list to get updates on the game.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
