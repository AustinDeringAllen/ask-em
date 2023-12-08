import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "./routers/user";
import { questionRouter } from "./routers/question";
import { answerRouter } from "./routers/answer";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  question: questionRouter,
  answer: answerRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
