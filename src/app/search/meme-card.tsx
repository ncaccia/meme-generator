// src/app/search/meme-card.tsx

import React from 'react';
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
                <p>Card Footer</p>
            </CardFooter>
        </Card>
    );
};