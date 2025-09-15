import { Navbar04 } from "@/components/ui/shadcn-io/navbar-04";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="relative w-full">
        <Navbar04/>
      </div>
        {children}
    </>
  );
}
