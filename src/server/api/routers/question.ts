import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const questionRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ body: z.string().min(1), uid: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      const newQuestion = await ctx.db.question.create({
        data: {
          body: input.body,
        },
      });

      return newQuestion;
    }),
  getAllQuestionsForUser: publicProcedure
    .input(z.object({ uid: z.string() }))
    .query(async ({ ctx, input }) => {
      const userQuestions = ctx.db.question.findMany({
        where: {
          uid: input.uid,
        },
      });

      return userQuestions;
    }),
});
