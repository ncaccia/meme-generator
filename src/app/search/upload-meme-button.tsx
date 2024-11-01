"use client"

import { IKUpload } from "imagekitio-next";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Button } from "~/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog"
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

const normalizeTag = (tag: string): string => {
    return tag
        .trim()                     // Remove leading/trailing spaces
        .toLowerCase()              // Convert to lowercase
        .replace(/\s+/g, '-')      // Replace spaces with hyphens
        .replace(/[^a-z0-9-]/g, '') // Remove special characters
        .replace(/-+/g, '-')       // Replace multiple hyphens with single hyphen
        .replace(/^-|-$/g, '');    // Remove leading/trailing hyphens
}



export default function UploadMemeButton() {
    const uploadInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const [displayName, setDisplayName] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [isUploading, setUploading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout>();

    // Handle file selection click
    const handleSelectFile = () => {
        // Clear any existing timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Set a timeout to reset the loading state if no file is selected
        timeoutRef.current = setTimeout(() => {
            // Only reset if no file was selected
            if (!uploadInputRef.current?.files?.length) {
                setUploading(false);
            }
        }, 1000);
    };

    // Handle dialog state
    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        if (!open) {
            setUploading(false); // Reset upload state when dialog closes
            setDisplayName(""); // Optional: reset display name too
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button>Upload Base Meme</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload your meme images</DialogTitle>
                    <DialogDescription>
                        This is a meme image anyone on the site can build upon.
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <form
                        className="flex flex-col gap-5"
                        onSubmit={(e) => {
                            e.preventDefault()
                            setUploading(true)
                            uploadInputRef.current?.click();
                            handleSelectFile();
                        }}>
                        <div>
                            <Label className="sr-only" htmlFor="displayName">Display Name</Label>
                            <Input
                                id="displayName"
                                name="displayName"
                                placeholder="Display Name"
                                required
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                            />
                        </div>

                        <div>
                            <Label className="sr-only" htmlFor="tags">Tags</Label>
                            <Input
                                id="tags"
                                name="tags"
                                placeholder="Comma delimited list of tags"
                                required
                                value={tags.join(", ")}
                                onChange={(e) => {
                                    const inputValue = e.target.value;
                                    // Just split by comma and trim, don't normalize while typing
                                    const newTags = inputValue.split(",").map(tag => tag.trim());
                                    setTags(newTags);
                                }}
                            />
                        </div>

                        <IKUpload
                            fileName="test-upload.png"
                            tags={[
                                normalizeTag(displayName),
                                ...tags.map(tag => normalizeTag(tag)).filter(tag => tag.length > 0)
                            ]}
                            customMetadata={{ displayName }}
                            onError={(err) => {
                                setUploading(false)
                                console.log("Error:", err);

                            }}
                            onSuccess={(res) => {
                                setUploading(false)
                                router.push(`/customize/${res.fileId}`)
                            }}
                            onUploadStart={() => {
                                // Clear the timeout when upload starts
                                if (timeoutRef.current) {
                                    clearTimeout(timeoutRef.current);
                                }
                                setUploading(true);
                            }}
                            style={{ display: 'none' }} // hide the default input and use the custom upload button
                            ref={uploadInputRef}
                        />

                        <DialogFooter className="sm:flex sm:justify-end">
                            <DialogClose asChild>
                                <Button
                                    type="button"
                                    variant="secondary"
                                >
                                    Close
                                </Button>
                            </DialogClose>
                            <Button
                                disabled={isUploading}
                                type="submit"
                            >
                                {isUploading && <Spinner />}
                                Select and upload Image
                            </Button>
                        </DialogFooter>

                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

function Spinner() {
    return (
        <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
        </svg>
    )
}