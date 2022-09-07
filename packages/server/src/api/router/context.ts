import * as trpc from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { prisma } from "../../utils/prisma";

export const createContext = (
    opts?: trpcExpress.CreateExpressContextOptions
) => {
    const req = opts?.req;
    const res = opts?.res;

    return {
        req,
        res,
        prisma,
    };
};

type Context = trpc.inferAsyncReturnType<typeof createContext>;
export const createRouter = () => trpc.router<Context>();
