// src/app/favorites/page.tsx

import { unstable_noStore } from "next/cache";
import { getUserFavoriteMeme } from "./loaders";
import FavoritesList from "./favorites-list";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { Card } from "~/components/ui/card";
import { auth } from "~/auth";

export default async function FavoritePage() {
    unstable_noStore(); // this tells nextjs to not cache this page.

    const session = await auth();
    const favorites = session ? await getUserFavoriteMeme() : [];

    return (

        <div className="container mx-auto space-y-8 py-8 px-4">
            <div className="flex items-center justify-between">
                <h1 className="text-4xl font-bold">Favorites Memes</h1>
            </div>

            {favorites.length === 0
                ?
                <Card className="flex flex-col items-center justify-center space-y-4 p-10">
                    <Image src="/no-data.svg" alt="no-data" width={200} height={200} />
                    <p>You have no favorite memes yet!</p>
                    <Button>
                        <Link href="/search?q=">Search for one!</Link>
                    </Button>
                </Card>
                : < FavoritesList favorites={favorites} isAuthenticated={!!session} />
            }

        </div>



    )
}