"use client";
// import Image from "next/image";
import { IKImage, IKUpload } from "imagekitio-next";
import { useState } from "react";
import { urlEndpoint } from "./providers";


export default function Home() {
  const [name, setName] = useState<string | null>(null);
  
  return (
    <div className="m-5">

      {name && // only display the image if filePath is truththly) 
        <IKImage
          urlEndpoint={urlEndpoint}
          path={name}
          width={500}
          height={400}
          transformation={[{ raw: "l-text,i-hello world,fs-50,l-end" }]}
          alt="baloon graving meme"
        />
      }

      <div>
        <h2>File upload</h2>
        <IKUpload
          fileName="test-upload.png"
          onError={(err) => {
            console.log("Error:", err);

          }}
          onSuccess={(res) => {
            console.log("Success: ", res);
            setName(res.filePath)
          }}
        />
      </div>
    </div>
  );
}
