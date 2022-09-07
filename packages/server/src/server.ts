import cors from "cors";
import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./api/router";
import { createContext } from "./api/router/context";
import morgan from "morgan";

export const createServer = () => {
    const app = express();
    // Middleware
    app.use(cors());
    app.use(express.json());
    app.use(morgan("tiny"));
    // TRPC
    app.use(
        "/trpc",
        trpcExpress.createExpressMiddleware({
            router: appRouter,
            createContext,
        })
    );
    return { app };
};
