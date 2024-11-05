"use client";

import { FileObject } from "imagekit/dist/libs/interfaces";
import { IKImage } from "imagekitio-next";
import { useState } from "react";
import { urlEndpoint } from "~/app/providers";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Slider } from "~/components/ui/slider"

export default function CustomizePanel({
    file,
}: {
    file: Pick<FileObject, "filePath" | "name">
}) {
    const [textOverley1, setTextOverley1] = useState("");
    const [textOverley1XPosition, setTextOverley1XPosition] = useState(0);
    const [textOverley1YPosition, setTextOverley1YPosition] = useState(0);

    const xPositionDecimal = textOverley1XPosition / 100;
    const yPositionDecimal = textOverley1YPosition / 100;

    const transformations = [];
    if (textOverley1) {
        transformations.push({
            raw: `l-text,i-${textOverley1},fs-50,ly-bh_mul_${yPositionDecimal.toFixed(2)},lx-bw_mul_${xPositionDecimal.toFixed(2)},l-end`
        })
    }


    return (
        <div className="grid grid-cols-2 gap-4">
            <form className="space-y-4">
                <Label className="text-sm font-bold" htmlFor="textOverley1">Text Overley 1</Label>
                <Input id="textOverley1" name="textOverley1" type="text"
                    onChange={(e) => setTextOverley1(e.target.value)}
                    value={textOverley1}
                />
                <Label className="text-sm font-bold" htmlFor="textOverley1XPosition">Text 1 X Position = {textOverley1XPosition}</Label>
                <Slider
                    id="textOverley1XPosition"
                    value={[textOverley1XPosition]}
                    onValueChange={([v]) => setTextOverley1XPosition(v)}
                />
                <Label className="text-sm font-bold" htmlFor="textOverley1YPosition">Text 1 X Position = {textOverley1YPosition}</Label>
                <Slider
                    id="textOverley1YPosition"
                    value={[textOverley1YPosition]}
                    onValueChange={([v]) => setTextOverley1YPosition(v)}
                />

            </form>

            <IKImage
                urlEndpoint={urlEndpoint}
                path={file.filePath}
                alt={file.name}
                transformation={transformations}
            />
        </div>
    )
}