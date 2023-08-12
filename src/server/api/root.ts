import { createTRPCRouter } from "~/server/api/trpc";
import { choreRouter } from "./routers/chore";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  chore: choreRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
