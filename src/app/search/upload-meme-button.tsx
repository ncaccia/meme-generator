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



export default function UploadMemeButton() {
    const uploadInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const [displayName, setDisplayName] = useState("");
    const [isUploading, setUploading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // Handle file selection click
    const handleSelectFile = () => {
        // Set a timeout to reset the loading state if no file is selected
        setTimeout(() => {
            // Check if a file was actually selected
            if (!uploadInputRef.current?.files?.length) {
                setUploading(false);
            }
        }, 500); // Give enough time for file selection
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
                        className="flex flex-col gap-4"
                        onSubmit={(e) => {
                            e.preventDefault()
                            setUploading(true)
                            uploadInputRef.current?.click();
                            handleSelectFile();
                        }}>
                        <Label className="sr-only" htmlFor="displayName">Display Name</Label>
                        <Input
                            id="displayName"
                            name="displayName"
                            placeholder="Display Name"
                            required
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                        />
                        <IKUpload
                            fileName="test-upload.png"
                            customMetadata={{ displayName }}
                            onError={(err) => {
                                setUploading(false)
                                console.log("Error:", err);

                            }}
                            onSuccess={(res) => {
                                setUploading(false)
                                router.push(`/customize/${res.fileId}`)
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