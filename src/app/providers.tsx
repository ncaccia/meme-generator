// src/app/providers.tsx

"use client"

import { ImageKitProvider } from "imagekitio-next"
import { ThemeProvider } from "~/components/theme-provider";

const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;

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

export const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <ImageKitProvider
                publicKey={publicKey}
                urlEndpoint={urlEndpoint}
                authenticator={authenticator}
            >
                {children}
            </ImageKitProvider>
        </ThemeProvider>
    )
}

