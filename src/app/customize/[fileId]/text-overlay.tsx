"use client";

import { useState, useEffect } from "react";
import { Card } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Slider } from "~/components/ui/slider"
import { TwitterPicker } from 'react-color';



export default function TextOverlay({
    index,
    onUpdate,
}: {
    index: number;
    onUpdate: (index: number, text: string, x: number, y: number, fontSize: number, bgColor?: string) => void;
}) {
    const [textOverley, setTextOverley] = useState("Example Text");
    const [textOverleyXPosition, setTextOverleyXPosition] = useState(0);
    const [textOverleyYPosition, setTextOverleyYPosition] = useState(0);
    const [applyColorPickerCheckbox, setApplyColorPickerCheckbox] = useState(false);
    const [textBgColor, setTextBgColor] = useState("#FFFFFF");
    const [textFontSize, setTextFontSize] = useState(50);

    const xPositionDecimal = textOverleyXPosition / 100;
    const yPositionDecimal = textOverleyYPosition / 100;
    const bgColor = applyColorPickerCheckbox ? textBgColor.replace("#", "") : undefined;

    useEffect(() => {
        onUpdate(
            index,
            textOverley,
            xPositionDecimal,
            yPositionDecimal,
            textFontSize,
            bgColor
        );
    }, [index, textOverley, xPositionDecimal, yPositionDecimal, textFontSize, bgColor, onUpdate]);

    return (
        <Card className="p-5 space-y-4">
            <div className="flex justify-between gap-8">
                <div className="flex-grow">
                    <Label className="text-sm font-bold" htmlFor={`textOverley${index}`}>Text Overley {index}</Label>
                    <Input
                        className="pt-2"
                        id={`textOverley${index}`} name={`textOverley${index}`} type="text"
                        onChange={(e) => { setTextOverley(e.target.value) }}
                        value={textOverley}
                    />
                </div>
                <div className="flex items-center space-x-2 pt-6">
                    <Checkbox
                        id="backgroundColor"
                        checked={applyColorPickerCheckbox}
                        onCheckedChange={(checked) => {
                            setApplyColorPickerCheckbox(checked as boolean);
                        }}
                    />
                    <label
                        htmlFor="backgroundColor"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Apply text background
                    </label>
                </div>
            </div>
            <div>
                {applyColorPickerCheckbox && (
                    <TwitterPicker
                        color={textBgColor}
                        onChange={(color) => { setTextBgColor(color.hex) }}
                    />
                )}
            </div>
            <div>
                <Label className="text-sm font-bold" htmlFor={`textOverley${index}FontSize`}>Font Size</Label>
                <Slider
                    className="pt-2"
                    id={`textOverley${index}FontSize`}
                    value={[textFontSize]}
                    onValueChange={([v]) => { setTextFontSize(v); }}
                />
            </div>
            <div>
                <Label className="text-sm font-bold" htmlFor={`textOverley${index}XPosition`}>X Position = {textOverleyXPosition}</Label>
                <Slider
                    className="pt-2"
                    id={`textOverley${index}XPosition`}
                    value={[textOverleyXPosition]}
                    onValueChange={([v]) => { setTextOverleyXPosition(v) }}
                />
            </div>
            <div>
                <Label className="text-sm font-bold" htmlFor={`textOverley${index}YPosition`}>Y Position = {textOverleyYPosition}</Label>
                <Slider
                    className="pt-2"
                    id={`textOverley${index}YPosition`}
                    value={[textOverleyYPosition]}
                    onValueChange={([v]) => { setTextOverleyYPosition(v) }}
                />
            </div>
        </Card>
    )
}