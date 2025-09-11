import type { Metadata } from "next";
import "./globals.css";
import Layout from "./admin/Components/Layout"; // <-- Import the new component

export const metadata: Metadata = {
  title: "Your App Title",
  description: "Your App Description",
};

// This is now a Server Component (no "use client")
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}