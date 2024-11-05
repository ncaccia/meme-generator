import { imagekit } from "~/lib/image-kit";
import { unstable_noStore } from "next/cache";
import CustomizePanel from "./customize-panel";


export default async function CustomizePage({
    params,
}: {
    params: { fileId: string };
}) {
    unstable_noStore(); // this tells nextjs to not cache this page.

    const file = await imagekit.getFileDetails(params.fileId);

    // console.log("File details: ", file);

    return (

        <div className="container mx-auto space-y-8 py-8 px-4">
            <h1 className="text-4xl font-bold">Customize</h1>

            <CustomizePanel file={{
                filePath: file.filePath,
                name: file.name
            }} />
        </div>



    )
}