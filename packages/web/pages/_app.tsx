import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";
import { trpc } from "../utils/trpc";

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
    const [trpcClient] = useState(() =>
        trpc.createClient({
            url: "http://localhost:4000/trpc",
        })
    );

    return (
        <trpc.Provider client={trpcClient} queryClient={client}>
            <QueryClientProvider client={client}>
                <Component {...pageProps} />;
            </QueryClientProvider>
        </trpc.Provider>
    );
}

export default MyApp;
