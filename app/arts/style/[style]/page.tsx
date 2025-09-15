import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import ArtItem from "../../components/ArtItem";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar-home";
import { Suspense } from "react";

type Art = {
  id: string,
  title: string,
  style: string,
  description?: string,
  imageUrl: string,
  price: number,
  artist: {
    id: string,
    username: string,
  }
}

export default async function ArtPage({ params }: { params: { style: string } }) {
  const param = (await params).style.split('/').at(-1);
  const arts = (await axios.get<Art[]>(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}art/style/${param}`)).data;

  return (
    <>
      <SidebarProvider>
        <AppSidebar className="sticky" />
        <SidebarInset>
          <div className="flex flex-wrap gap-2 p-4">
            <Suspense>
              {arts.length === 0 && (
                <p className="text-muted-foreground">
                  No results found
                </p>
              )}

              {arts.length !== 0 &&
                arts.map((art) => (
                  <ArtItem
                    key={art.id}
                    artId={art.id}
                    title={art.title}
                    imagePath={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + art.imageUrl}
                    price={art.price}
                    artistName={art.artist.username}
                  />
                ))}
            </Suspense>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
