"use client";

import { FileObject } from "imagekit/dist/libs/interfaces";
import { IKImage } from "imagekitio-next";
import { useState } from "react";
import { urlEndpoint } from "~/app/providers";
import TextOverlay from "./text-overlay";

export default function CustomizePanel({
    file,
}: {
    file: Pick<FileObject, "filePath" | "name">
}) {

    const [transformations, setTransformations] = useState<Record<string, { raw: string }>>({});
    const transformationsArray = Object.values(transformations);

    return (
        <div className="grid grid-cols-2 gap-4">
            <form className="space-y-4">
                <TextOverlay
                    onUpdate={(text, x, y) => {
                        setTransformations((current) => ({
                            ...current,
                            ["Text1"]: {
                                raw: `l-text,i-${text ?? ""},fs-50,ly-bh_mul_${y.toFixed(2)},lx-bw_mul_${x.toFixed(2)},l-end`,
                            },
                        }))
                    }}
                />
                <TextOverlay
                    onUpdate={(text, x, y) => {
                        setTransformations((current) => ({
                            ...current,
                            ["Text2"]: {
                                raw: `l-text,i-${text ?? ""},fs-50,ly-bh_mul_${y.toFixed(2)},lx-bw_mul_${x.toFixed(2)},l-end`,
                            },
                        }))
                    }}
                />
            </form>

            <IKImage
                urlEndpoint={urlEndpoint}
                path={file.filePath}
                alt={file.name}
                transformation={transformationsArray}
            />
        </div>
    )
}