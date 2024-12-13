import { unstable_noStore } from "next/cache";
import ResultList from "./result-list";
import UploadMemeButton from "./upload-meme-button";
import { imagekit } from "~/lib/image-kit";
import { Card } from "~/components/ui/card";
import Image from "next/image";

export default async function SearchPage({
    searchParams,
}: {
    searchParams: { q: string };
}) {
    unstable_noStore(); // this tells nextjs to not cache this page.

    const files = await imagekit.listFiles({
        tags: searchParams.q.toLowerCase()
    });


    return (

        <div className="container mx-auto space-y-8 py-8 px-4">
            <div className="flex items-center justify-between">
                <h1 className="text-4xl font-bold">Search Results</h1>
                <UploadMemeButton />
            </div>

            {files.length === 0
                ?
                <Card className="flex flex-col items-center justify-center space-y-4 p-10">
                    <Image src="/no-data.svg" alt="no-data" width={200} height={200} />
                    <p>Empty search! try another keyword</p>
                </Card>
                : <ResultList files={files} />
            }
        </div>



    )
}