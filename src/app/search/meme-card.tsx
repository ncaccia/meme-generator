// src/app/search/meme-card.tsx

import Link from 'next/link';
import React from 'react';
import { Button } from '~/components/ui/button';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from '~/components/ui/card';

// Define the structure for meme file data
interface MemeFile {
    fileId: string;
    filePath: string;
    name: string;
    tags?: string[] | null;
}

interface MemeCardProps {
    file: MemeFile;
    children: React.ReactNode;
}

export default function MemeCard({
    file,
    children
}: MemeCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{file.name}</CardTitle>
                {file.tags && (
                    <CardDescription>{file.tags}</CardDescription>
                )}
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            <CardFooter>
                <Button asChild>
                    <Link href={`/customize/${file.fileId}`}>Customize</Link>
                </Button>
            </CardFooter>
        </Card>
    );
};