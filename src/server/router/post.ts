import { createRouter } from "./context";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

const formInput = z.object({
    title: z.string(),
    content: z.string()
});

export type FormInput = z.TypeOf<typeof formInput>;

export const postRouter = createRouter()
    .query("all", {
        resolve: async ({ ctx }) => {
            return await ctx.prisma.post.findMany();
        }
    })
    .mutation("create", {
        input: formInput,
        resolve: async ({ input, ctx }) => {
            try {
                await ctx.prisma.post.create({
                    data: { ...input }
                });
            } catch (error) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Unable to create post"
                });
            }
        }
    });
