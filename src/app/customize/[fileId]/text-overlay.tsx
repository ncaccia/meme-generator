"use client";

import { useState } from "react";
import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Slider } from "~/components/ui/slider"


export default function TextOverlay({
    index,
    onUpdate,
}: {
    index: number;
    onUpdate: (text: string, x: number, y: number) => void;
}) {
    const [textOverley, setTextOverley] = useState("");
    const [textOverleyXPosition, setTextOverleyXPosition] = useState(0);
    const [textOverleyYPosition, setTextOverleyYPosition] = useState(0);

    const xPositionDecimal = textOverleyXPosition / 100;
    const yPositionDecimal = textOverleyYPosition / 100;

    const transformations = [];
    if (textOverley) {
        transformations.push({
            raw: `l-text,i-${textOverley},fs-50,ly-bh_mul_${yPositionDecimal.toFixed(2)},lx-bw_mul_${xPositionDecimal.toFixed(2)},l-end`
        })
    }

    return (
        <Card className="p-5 space-y-4">
            <div>
                <Label className="text-sm font-bold" htmlFor={`textOverley${index}`}>Text Overley {index}</Label>
                <Input
                    className="pt-2"
                    id={`textOverley${index}`} name={`textOverley${index}`} type="text"
                    onChange={(e) => {
                        setTextOverley(e.target.value);
                        onUpdate(e.target.value, xPositionDecimal, yPositionDecimal);
                    }}
                    value={textOverley}
                />
            </div>
            <div>
                <Label className="text-sm font-bold" htmlFor={`textOverley${index}XPosition`}>Text {index} X Position = {textOverleyXPosition}</Label>
                <Slider
                    className="pt-2"
                    id="textOverleyXPosition"
                    value={[textOverleyXPosition]}
                    onValueChange={([v]) => {
                        setTextOverleyXPosition(v)
                        onUpdate(textOverley, v / 100, yPositionDecimal);
                    }}
                />
            </div>
            <div>
                <Label className="text-sm font-bold" htmlFor={`textOverley${index}YPosition`}>Text {index} Y Position = {textOverleyYPosition}</Label>
                <Slider
                    className="pt-2"
                    id="textOverleyYPosition"
                    value={[textOverleyYPosition]}
                    onValueChange={([v]) => {
                        setTextOverleyYPosition(v);
                        onUpdate(textOverley, xPositionDecimal, v / 100);
                    }}
                />
            </div>
        </Card>
    )
}