"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar-home";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import ArtItem from "./components/ArtItem";
import axios from "axios";

interface Art {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  artist: {
    username: string;
  }

}

export default function ArtsPage() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  const [arts, setArts] = useState<Art[]>([]);

  const fetchArts = async (query: string) => {
    try {
      if (query === '') {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}art`);
        setArts(res.data);
      } else {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}art/search/${query}`);
        setArts(res.data);
      }
    } catch (err) {
      setArts([]);
    }
  };

  useEffect(() => {
    fetchArts(search);
  }, [search]);

  return (
    <>
      <SidebarProvider>
        <AppSidebar className="sticky" />
        <SidebarInset>
          <div className="flex flex-wrap gap-2 p-4">
            <Suspense>
              {arts.length === 0 && (
                <p className="text-muted-foreground">
                  No results found {search ? `for "${search}"` : ""}
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
