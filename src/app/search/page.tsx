import { unstable_noStore } from "next/cache";
import ResultList from "./result-list";
import UploadMemeButton from "./upload-meme-button";
import { imagekit } from "~/lib/image-kit";

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
            <ResultList files={files} />
        </div>



    )
}