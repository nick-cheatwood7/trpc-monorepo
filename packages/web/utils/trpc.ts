import { createReactQueryHooks } from "@trpc/react";
import { AppRouter } from "@trpc-monorepo/server";

export const trpc = createReactQueryHooks<AppRouter>();
