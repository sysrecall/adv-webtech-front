

"use client";

// import "./globals.css";
import { usePathname } from "next/navigation";
import Navbar from "./Components/Navbar";

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

// import Navbar from "./Components/Navbar";

// export default function Layout({ children }: { children: React.ReactNode }) {
//   return (
//     <div>
//       <Navbar />
//       <main>{children}</main>
//     </div>
//   );
// }

// export default function Layout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <>
//         {children}
//     </>
//   );
// }
