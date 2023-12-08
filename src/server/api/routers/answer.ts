import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const answerRouter = createTRPCRouter({
  newAnswer: protectedProcedure
    .input(z.object({ qid: z.string(), answerBody: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const newAnswer = await ctx.db.answer.create({
        data: {
          body: input.answerBody,
          question: { connect: { id: input.qid } },
        },
      });

      return newAnswer;
    }),
});
