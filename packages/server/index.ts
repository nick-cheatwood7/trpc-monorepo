import express from "express";
import * as trpc from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";

const appRouter = trpc.router().query("hello", {
    resolve() {
        return "hello world!";
    }
});

const app = express();
const port = 4000;

app.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext: () => null
    })
);

app.get("/", (_req, res) => {
    res.send("Hello from api-server");
});
