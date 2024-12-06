"use client";

import { FileObject } from "imagekit/dist/libs/interfaces";
import { IKImage } from "imagekitio-next";
import { useCallback, useState } from "react";
import { urlEndpoint } from "~/app/providers";
import TextOverlay from "./text-overlay";
import { Button } from "~/components/ui/button";
import { X } from "lucide-react";
import { debounce } from "lodash";
import { Card } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";

type Effect = {
    label: string;
    transformation: string
};

const imageEffects: Record<string, Effect> = {
    grayscale: {
        label: "Greyscale",
        transformation: "e-grayscale"
    },
    sharpen: {
        label: "Sharpen",
        transformation: "e-sharpen-10"
    },
    blur: {
        label: "Blur",
        transformation: "bl-5"
    }
} as const;

type EffectName = keyof typeof imageEffects;


export default function CustomizePanel({
    file,
}: {
    file: Pick<FileObject, "filePath" | "name">
}) {

    const [textTransformations, setTextTransformations] = useState<Record<string, { raw: string }>>({});
    const [numberOfOverlays, setNumberOfOverlays] = useState(1);
    const [activeEffects, setActiveEffects] = useState<Record<EffectName, boolean>>({
        grayscale: false,
        sharpen: false,
        blur: false
    });

    // Convert textTransformations object to array for IKImage
    const textTransformationsArray = Object.values(textTransformations);

    // Handler of effect toggle
    const toggleEffect = (effectName: EffectName) => {
        setActiveEffects((current) => {
            return {
                ...current,
                [effectName]: !current[effectName]
            }
        })
    };

    // Get active transformations for our effects
    const getActiveTransformations = () => {
        const effectTransformations = [];
        for (const [effectName, isActive] of Object.entries(activeEffects)) {
            if (isActive) {
                effectTransformations.push({
                    raw: imageEffects[effectName as EffectName].transformation
                });
            }
        }
        return effectTransformations;


        // Alternative way to get active transformations
        // return Object.entries(activeEffects)
        //     .filter(([effectName, isActive]) => isActive)
        //     .map(([effectName]) => ({
        //         raw: imageEffects[effectName as EffectName].transformation
        //     }));
    };

    // Handler for updating overlay text and position
    const onUpdate = useCallback(
        debounce(
            (index: number, text: string, x: number, y: number, textFontSize: number, bgColor?: string) => {

                setTextTransformations((current) => {
                    const newTextTransformations = { ...current };

                    if (!text?.trim()) {
                        delete newTextTransformations[`text${index}`];
                        return newTextTransformations
                    }

                    return {
                        ...current,
                        [`text${index}`]: {
                            raw: `l-text,i-${text.trim()},fs-${textFontSize},${bgColor ? `bg-${bgColor},` : ""}pa-15,ly-bh_mul_${y.toFixed(2)},lx-bw_mul_${x.toFixed(2)},l-end`,
                        },
                    };
                });
            },
            250
        ),
        []
    );

    // Handler for removing an overlay
    const removeOverlay = useCallback((indexToRemove: number) => {
        // Decrease the number of overlay cards
        setNumberOfOverlays(prev => prev - 1);

        // Update textTransformations
        setTextTransformations(current => {
            const newTextTransformations: Record<string, { raw: string }> = {};

            // Filter out the removed overlay and reindex remaining ones
            Object.entries(current).forEach(([key, value]) => {
                const currentIndex = parseInt(key.replace('text', ''));
                if (currentIndex !== indexToRemove + 1) { // Add 1 because TextOverlay component uses 1-based indexing
                    const newIndex = currentIndex > indexToRemove + 1 ? currentIndex - 1 : currentIndex;
                    newTextTransformations[`text${newIndex}`] = value;
                }
            });

            return newTextTransformations;
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

            {/* Left column: Controls and overlays (scrollable) */}
            <div className="overflow-y-auto pr-4" style={{ maxHeight: 'calc(100vh - 200px)' }}>
                <div className="space-y-4">
                    <Card className="p-5 space-y-2">
                        <h2 className="text-sm font-bold">Effects</h2>
                        <div className="flex space-x-2">
                            {Object.entries(imageEffects).map(([effectName, effect]) => (
                                <div key={effectName} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={effectName}
                                        checked={activeEffects[effectName]}
                                        onCheckedChange={() => toggleEffect(effectName)}
                                    />
                                    <label
                                        htmlFor={effectName}
                                        className="text-sm font-medium leading-none"
                                    >
                                        {effect.label}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </Card>

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
            </div>

            {/* Right column: Image preview (sticky) */}

            <div className="sticky top-[200px]">
                <IKImage
                    urlEndpoint={urlEndpoint}
                    path={file.filePath}
                    alt={file.name}
                    transformation={[
                        ...getActiveTransformations(),
                        ...textTransformationsArray,
                    ].filter(Boolean)
                    }
                />
            </div>
        </div>
    )
}