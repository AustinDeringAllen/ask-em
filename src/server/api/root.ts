import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { questionRouter } from "./routers/questions";
import { userRouter } from "./routers/users";
import { answerRouter } from "./routers/answer";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  user: userRouter,
  question: questionRouter,
  answer: answerRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
