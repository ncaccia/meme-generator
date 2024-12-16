import { imagekit } from "~/lib/image-kit";
import { unstable_noStore } from "next/cache";
import CustomizePanel from "./customize-panel";
import { getFavoriteMeme } from "./loaders";
import { auth } from "~/auth";


export default async function CustomizePage({
    params,
}: {
    params: { fileId: string };
}) {
    unstable_noStore(); // this tells nextjs to not cache this page.

    const session = await auth();
    const isFavorited = session ? await getFavoriteMeme(params.fileId) : false;

    const file = await imagekit.getFileDetails(params.fileId);


    return (

        <div className="container mx-auto space-y-8 py-8 px-4">

            <CustomizePanel
                file={{
                    filePath: file.filePath,
                    name: file.name,
                    fileId: file.fileId,
                }}
                isFavorited={isFavorited}
                isAuthenticated={!!session}
            />
        </div>



    )
}