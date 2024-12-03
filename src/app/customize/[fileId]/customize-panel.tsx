"use client";

import { FileObject } from "imagekit/dist/libs/interfaces";
import { IKImage } from "imagekitio-next";
import { useCallback, useState } from "react";
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

    // Convert transformations object to array for IKImage
    const transformationsArray = Object.values(transformations);

    // Handler for updating overlay text and position
    const onUpdate = useCallback((index: number, text: string, x: number, y: number, textFontSize: number, bgColor?: string) => {
        setTransformations((current) => {
            const newTransformations = { ...current };

            if (!text?.trim()) {
                delete newTransformations[`text${index}`];
                return newTransformations
            }

            return {
                ...current,
                [`text${index}`]: {
                    raw: `l-text,i-${text.trim()},fs-${textFontSize},${bgColor ? `bg-${bgColor},` : ""}pa-15,ly-bh_mul_${y.toFixed(2)},lx-bw_mul_${x.toFixed(2)},l-end`,
                },
            };
        });
    }, [])

    // Handler for removing an overlay
    const removeOverlay = useCallback((indexToRemove: number) => {
        // Decrease the number of overlay cards
        setNumberOfOverlays(prev => prev - 1);
        
        // Update transformations
        setTransformations(current => {
            const newTransformations: Record<string, { raw: string }> = {};
            
            // Filter out the removed overlay and reindex remaining ones
            Object.entries(current).forEach(([key, value]) => {
                const currentIndex = parseInt(key.replace('text', ''));
                if (currentIndex !== indexToRemove + 1) { // Add 1 because TextOverlay component uses 1-based indexing
                    const newIndex = currentIndex > indexToRemove + 1 ? currentIndex - 1 : currentIndex;
                    newTransformations[`text${newIndex}`] = value;
                }
            });
            
            return newTransformations;
        });
    }, []);

     // Handler for removing the last overlay
     const removeLastOverlay = useCallback(() => {
        setNumberOfOverlays(prev => {
            const lastIndex = prev - 1;
            removeOverlay(lastIndex);
            return prev; // The actual decrement happens in removeOverlay
        });
    }, [removeOverlay]);

    return (
        <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
                {new Array(numberOfOverlays).fill("").map((_, index) => (
                    <div key={index} className="relative">
                        <TextOverlay
                            key={index}
                            index={index + 1}
                            onUpdate={onUpdate}
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
                    <Button onClick={() => { setNumberOfOverlays(prev => prev + 1) }}>
                        Add Another Text Overlay
                    </Button>
                    <Button
                        variant={"destructive"}
                        onClick={removeLastOverlay}>
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