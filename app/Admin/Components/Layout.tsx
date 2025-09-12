
"use client";

// import "./globals.css";
import { usePathname } from "next/navigation";
import Navbar from "../Components/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        {!isAdmin && <Navbar />}
        {children}
      </body>
    </html>
  );
}
