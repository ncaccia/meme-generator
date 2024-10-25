"use client";
// import Image from "next/image";
import { IKImage, IKUpload, ImageKitProvider } from "imagekitio-next";
import { useState } from "react";
import { Button } from "~/components/ui/button";

const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

const authenticator = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/auth");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error: unknown) {
    let errorMessage = "Authentication request failed: ";
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }
};

export default function Home() {
  const [filePath, setFilePath] = useState("")
  return (
    <div className="m-5">
      <Button
        variant={"destructive"}
      >
        Click Me
        </Button>
      <ImageKitProvider
        publicKey={publicKey}
        urlEndpoint={urlEndpoint}
        authenticator={authenticator}
      >

        {filePath && // only display the image if filePath is truththly) 
          <IKImage
            path={filePath}
            width={500}
            height={400}
            transformation={[
              {
                raw: "l-text,i-hello world,fs-50,l-end",
              },
            ]}
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
              setFilePath(res.filePath)
            }}
          />
        </div>
      </ImageKitProvider>
    </div>
  );
}
