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
import { Heart } from 'lucide-react';

// Define the structure for meme file data
interface MemeFile {
    fileId: string;
    filePath: string;
    name: string;
    customMetadata?: { displayName: string };
    tags?: string[] | null;
}

interface MemeCardProps {
    file: MemeFile;
    children: React.ReactNode;
    isAuthenticated: boolean;
    favoritesCount?: number;
}

export default function MemeCard({
    file,
    children,
    isAuthenticated,
    favoritesCount,
}: MemeCardProps) {
    const currentPath = usePathname();

    return (
        <Card>
            <CardHeader>
                <CardTitle className='flex justify-between items-baseline'>
                    {file.customMetadata?.displayName ?? file.name}
                    {favoritesCount !== undefined &&
                        <div className='flex items-center gap-1 py-2'>
                            <Heart fill="black" size={14} />
                            <div className='text-sm'>{favoritesCount}</div>
                        </div>
                    }
                </CardTitle>
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

                {isAuthenticated && (
                    <FavoriteButton
                        isFavorited={true}
                        fileId={file.fileId}
                        filePath={file.filePath}
                        name={file.name}
                        pathToRevalidate={currentPath}
                        tags={file.tags ?? undefined}
                    />
                )}
            </CardFooter>
        </Card>
    );
};