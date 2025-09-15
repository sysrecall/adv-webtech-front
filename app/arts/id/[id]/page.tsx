import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import ArtItem from "../../components/ArtItem";

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

export async function generateStaticParams() {
  const arts = (await axios.get<Art[]>(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}art`)).data;
  return arts.map((art) => ({
    id: art.id,
  }));
}

export default async function ArtPage({ params }: { params: { id: string } }) {
  const art = (await axios.get<Art>(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}art/${(await params).id}`)).data;
  const similarArts: Art[] = (await axios.get<Art[]>(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}art/similar/style/${art.style}`)).data;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="flex flex-col gap-4 relative">
          <Image
            src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + art.imageUrl}
            fill={true}
            alt={art.title}
            className="rounded-2xl shadow-lg object-contain p-4"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-4xl font-bold">{art.title}</h1>
            <p className="text-gray-600 mt-2 text-lg">
              by @<Link href={"../artist/" + art.artist.id}>{art.artist.username}</Link>
            </p>
          </div>


          <p className="text-gray-700 leading-relaxed">
            {art.description}
          </p>

          <div className="flex gap-4 mt-4">
            <Button className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-2xl shadow-lg text-lg">
              <ShoppingCart size={20} /> Add to Cart
            </Button>
            <Button variant="outline" className="rounded-2xl px-6 py-3 text-lg">
              Buy Now
            </Button>
          </div>

          {/* Additional Info */}
          <div className="mt-8 border-t pt-6 grid md:grid-cols-3 gap-6 text-sm text-gray-600">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Highlights</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Original artwork by emerging and established artists</li>
                <li>High-resolution images suitable for printing</li>
                <li>Exclusive pieces with limited availability</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Details</h3>
              <p>
                Each piece is carefully curated to bring unique aesthetic value to your space.
                Detailed descriptions include the medium, dimensions, and inspiration behind the artwork.
                Perfect for collectors and art enthusiasts alike.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Delivery</h3>
              <p>
                Receive instant digital downloads for prints, or enjoy prompt shipping for physical pieces.
                All artwork comes with a certificate of authenticity.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Related Products */}
      <div className="max-w-6xl mx-auto mt-16">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {similarArts.map((sa) => (
            <ArtItem key={sa.id} title={sa.title} artistName={sa.artist.username} artId={sa.id} imagePath={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + sa.imageUrl} price={sa.price} />
          ))}
        </div>
      </div>
    </div>
  );
}
