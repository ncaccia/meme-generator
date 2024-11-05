"use client";

import { FileObject } from "imagekit/dist/libs/interfaces";
import { IKImage } from "imagekitio-next";
import { useState } from "react";
import { urlEndpoint } from "~/app/providers";
import TextOverlay from "./text-overlay";
import { Button } from "~/components/ui/button";

export default function CustomizePanel({
    file,
}: {
    file: Pick<FileObject, "filePath" | "name">
}) {

    const [transformations, setTransformations] = useState<Record<string, { raw: string }>>({});
    const [numberOfOverlays, setNumberOfOverlays] = useState(1);
    const transformationsArray = Object.values(transformations);

    return (
        <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
                {new Array(numberOfOverlays).fill("").map((_, index) => (

                    <TextOverlay
                        key={index}
                        index={index + 1}
                        onUpdate={(text, x, y) => {
                            setTransformations((current) => ({
                                ...current,
                                [`text${index}`]: {
                                    raw: `l-text,i-${text ?? ""},fs-50,ly-bh_mul_${y.toFixed(2)},lx-bw_mul_${x.toFixed(2)},l-end`,
                                },
                            }))
                        }}
                    />
                ))}

                <div className="flex gap-4">
                    <Button onClick={() => { setNumberOfOverlays(numberOfOverlays + 1) }}>
                        Add Another Text Overlay
                    </Button>
                    <Button
                        variant={"destructive"}
                        onClick={() => {
                            setNumberOfOverlays(numberOfOverlays - 1);
                            const lastIndex = numberOfOverlays - 1;
                            setTransformations((current) => {
                                const newCurrent = { ...current };
                                delete newCurrent[`text${lastIndex}`];
                                return newCurrent;
                            });
                        }}>
                        Remove Last
                    </Button>
                </div>
            </div>

            <IKImage
                urlEndpoint={urlEndpoint}
                path={file.filePath}
                alt={file.name}
                transformation={transformationsArray}
            />
        </div>
    )
}