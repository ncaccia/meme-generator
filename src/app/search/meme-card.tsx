import Link from 'next/link';
import React from 'react';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from '~/components/ui/card';
import { FavoriteButton } from '../customize/[fileId]/favorite-button';
import { usePathname } from 'next/navigation';

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
    const currentPath = usePathname();

    return (
        <Card>
            <CardHeader>
                <CardTitle>{file.name}</CardTitle>
                <div className="flex flex-wrap gap-2">
                    {file.tags && file.tags.length > 0 &&
                        file.tags.map((tag, index) => (
                            <Badge className="capitalize" key={index} variant="secondary">
                                {tag}
                            </Badge>
                        ))
                    }
                </div>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            <CardFooter className='flex gap-2'>
                <Button asChild>
                    <Link href={`/customize/${file.fileId}`}>Customize</Link>
                </Button>
                <FavoriteButton
                    isFavorited={true}
                    fileId={file.fileId}
                    filePath={file.filePath}
                    name={file.name}
                    pathToRevalidate={currentPath}
                    tags={file.tags ?? undefined}
                />
            </CardFooter>
        </Card>
    );
};