"use client"

import { IKImage } from "imagekitio-next"
import { urlEndpoint } from "../providers"
import MemeCard from "../search/meme-card"
import { type Favorite } from "../db/schema"


export default function FavoritesList({ favorites }: { favorites: Favorite[] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {favorites.map((favorite) =>
                <MemeCard
                    key={favorite.memeId}
                    file={{
                        fileId: favorite.memeId,
                        filePath: favorite.filePath,
                        name: favorite.name,
                        tags: favorite.tags,
                    }}
                >
                    <IKImage
                        key={favorite.memeId}
                        urlEndpoint={urlEndpoint}
                        path={favorite.filePath}
                        alt={favorite.name}
                        width={300}
                        height={300}
                    />
                </MemeCard>
            )}
        </div>
    )
}