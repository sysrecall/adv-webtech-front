import { Navbar04 } from "@/components/ui/shadcn-io/navbar-04";
import React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Search, Mail } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900">
      <div className="relative w-full">
        <Navbar04 />
      </div>
      <header className="container mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-pink-400 rounded-lg flex items-center justify-center text-white font-bold">AS</div>
          <div>
            <h1 className="text-lg font-semibold">Online Art Store</h1>
            <p className="text-xs text-slate-500 -mt-1">Original art & limited prints</p>
          </div>
        </div>

        <div className="md:hidden">
          <Button variant="ghost">Menu</Button>
        </div>
      </header>

      <section className="container mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
            Discover limited editions and one-of-a-kind pieces from independent artists around the world. Fast shipping, secure checkout, and a delightfully simple return policy.

          <div className="mt-8 flex gap-4 flex-wrap">
            <Button variant="outline" className="px-6 py-3 flex items-center gap-2"><Search /><Link href='/arts'> Browse collections </Link></Button>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <Card>
              <CardHeader className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500">Free shipping</p>
                  <p className="text-sm font-medium">On orders over $200</p>
                </div>
                <Badge>Popular</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">Local & global carriers, fully tracked.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <p className="text-xs text-slate-500">14-day returns</p>
                <p className="text-sm font-medium">Satisfaction guaranteed</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">Hassle-free returns on eligible items.</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="order-first lg:order-last">
            <div className="relative h-[420px] w-full bg-gradient-to-br from-pink-50 to-indigo-50">
              <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL+'uploads/art/astarrynight.jpg'} alt="Art collage" fill />
            </div>
        </div>
      </section>

    </main>
  );
}
