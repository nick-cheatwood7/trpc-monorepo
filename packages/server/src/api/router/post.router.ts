import { createRouter } from "./context";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const postRouter = createRouter()
    .query("all", {
        async resolve({ ctx }) {
            return ctx.prisma.post.findMany();
        },
    })
    .query("getPost", {
        input: z.object({
            id: z.number().min(0),
        }),
        async resolve({ ctx, input }) {
            return ctx.prisma.post.findUnique({ where: { id: input.id } });
        },
    })
    .mutation("create", {
        input: z.object({
            title: z.string(),
            content: z.string().optional(),
        }),
        async resolve({ ctx, input }) {
            try {
                return await ctx.prisma.post.create({
                    data: { ...input },
                });
            } catch (error) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Unable to create Post",
                });
            }
        },
    });
