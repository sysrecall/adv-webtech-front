import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Art Store",
  description: "Online Art Store",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <footer className="border-t bg-white border-slate-100">
          <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-slate-600">© {new Date().getFullYear()} Online Art Store — handcrafted with care</div>

            <div className="flex items-center gap-4">
              <a className="text-sm hover:text-slate-800">Privacy</a>
              <a className="text-sm hover:text-slate-800">Terms</a>
              <a className="text-sm hover:text-slate-800">Contact</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}