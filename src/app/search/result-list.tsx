"use client"

import { FileObject } from "imagekit/dist/libs/interfaces"
import { IKImage } from "imagekitio-next"
import { urlEndpoint } from "../providers"
import MemeCard from "./meme-card"


export default function ResultList({ files }: { files: FileObject[] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {files.map((file) =>
                <MemeCard
                    key={file.fileId}
                    file={{
                        filePath: file.filePath,
                        name: file.customMetadata?.displayName as string ?? file.name,
                        tags: file.tags,
                    }}
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