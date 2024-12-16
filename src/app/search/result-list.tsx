"use client"

import { FileObject } from "imagekit/dist/libs/interfaces"
import { IKImage } from "imagekitio-next"
import { urlEndpoint } from "../providers"
import MemeCard from "./meme-card"


export default function ResultList({
    files,
    isAuthenticated
}: {
    files: FileObject[],
    isAuthenticated: boolean
}
) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {files.map((file) =>
                <MemeCard
                    key={file.fileId}
                    file={{
                        fileId: file.fileId,
                        filePath: file.filePath,
                        name: file.customMetadata?.displayName as string ?? file.name,
                        tags: file.tags,
                    }}
                    isAuthenticated={isAuthenticated}
                >
                    <IKImage
                        key={file.fileId}
                        urlEndpoint={urlEndpoint}
                        path={file.filePath}
                        alt={file.name}
                        width={300}
                        height={300}
                    />
                </MemeCard>
            )}
        </div>
    )
}