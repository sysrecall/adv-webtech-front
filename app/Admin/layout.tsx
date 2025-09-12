
"use client";

import { NotificationsProvider } from "./contexts/NotificationsContext";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <NotificationsProvider>
    {children}
    </NotificationsProvider>
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
