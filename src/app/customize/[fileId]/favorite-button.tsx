import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";
import { toggleFavouriteMemeAction } from "./actions";
import { Button } from "~/components/ui/button";
import { Heart } from "lucide-react";

export function FavoriteButton({
    isFavorited,
    fileId,
    filePath,
    name,
    pathToRevalidate,
    tags,
}: {
    isFavorited?: boolean;
    fileId: string;
    filePath: string;
    name: string;
    pathToRevalidate: string;
    tags?: string[];

}) {

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <form
                        action={toggleFavouriteMemeAction.bind(
                            null,
                            fileId,
                            filePath,
                            name,
                            pathToRevalidate,
                            tags ?? undefined
                        )}
                    >
                        <Button
                            type="submit"
                            variant={"outline"}
                        >
                            {isFavorited ? <Heart fill="black" /> : <Heart fill="white" />}
                        </Button>
                    </form>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{isFavorited ? "Unlike this meme" : "Like this meme"}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}