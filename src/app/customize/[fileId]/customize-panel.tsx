"use client";

import { FileObject } from "imagekit/dist/libs/interfaces";
import { IKImage } from "imagekitio-next";
import { useState } from "react";
import { urlEndpoint } from "~/app/providers";
import TextOverlay from "./text-overlay";
import { Button } from "~/components/ui/button";
import { X } from "lucide-react";

export default function CustomizePanel({
    file,
}: {
    file: Pick<FileObject, "filePath" | "name">
}) {

    const [transformations, setTransformations] = useState<Record<string, { raw: string }>>({});
    const [numberOfOverlays, setNumberOfOverlays] = useState(1);
    const transformationsArray = Object.values(transformations);

    const removeOverlay = (indexToRemove: number) => {
        setNumberOfOverlays(numberOfOverlays - 1);
        setTransformations((current) => {
            const newTransformations = { ...current };
            // Remove the specific transformation
            delete newTransformations[`text${indexToRemove}`];
            // Reindex the transformations after the removed one
            for (let i = indexToRemove + 1; i < numberOfOverlays; i++) {
                if (newTransformations[`text${i}`]) {
                    newTransformations[`text${i - 1}`] = newTransformations[`text${i}`];
                    delete newTransformations[`text${i}`];
                }
            }
            return newTransformations;
        });
    };

    return (
        <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
                {new Array(numberOfOverlays).fill("").map((_, index) => (
                    <div key={index} className="relative">
                        <TextOverlay
                            key={index}
                            index={index + 1}
                            onUpdate={(text, x, y) => {
                                setTransformations((current) => {
                                    const newTransformations = { ...current };

                                    if (!text?.trim()) {
                                        delete newTransformations[`text${index}`];
                                        return newTransformations
                                    }

                                    return {
                                        ...current,
                                        [`text${index}`]: {
                                            raw: `l-text,i-${text.trim()},fs-50,ly-bh_mul_${y.toFixed(2)},lx-bw_mul_${x.toFixed(2)},l-end`,
                                        },
                                    };
                                });
                            }}
                        />
                        <button
                            onClick={() => removeOverlay(index)}
                            className="absolute top-2 right-2 bg-black text-white rounded-full w-6 h-6 flex items-center justify-center"
                            aria-label={`Remove overlay ${index + 1}`}
                        >
                            <X size={14} />
                        </button>

                    </div>
                ))}

                <div className="flex gap-4">
                    <Button onClick={() => { setNumberOfOverlays(numberOfOverlays + 1) }}>
                        Add Another Text Overlay
                    </Button>
                    <Button
                        variant={"destructive"}
                        onClick={() => { removeOverlay(numberOfOverlays - 1) }}>
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