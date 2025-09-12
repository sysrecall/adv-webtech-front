import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

type ArtItemProps = {
    artId: string,
    title: string,
    artistName: string,
    imagePath: string,
    price: number
}
export default function ArtItem({artId, title, artistName, imagePath, price }: ArtItemProps) {
    return (
        <div className="p-6 flex justify-center">
            <Link href={"/arts/" + artId}>
            <Card className="w-60">
                <CardContent className="p-3">
                    <div className="aspect-square rounded-md bg-gray-100 mb-2 relative">
                        <Image
                            src={imagePath}
                            alt={title}
                            fill={true}
                            className="object-cover rounded-md"
                        />
                    </div>

                    <CardTitle className="text-sm mb-1">{title}</CardTitle>
                    <CardDescription className="text-xs mb-2 line-clamp-2">
                        by @{artistName}
                    </CardDescription>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-bold">${price}</span>
                        <Button size="sm" className="text-xs px-2 py-1 h-7">Add</Button>
                    </div>
                </CardContent>
            </Card>
            </Link>
        </div>
    );
}