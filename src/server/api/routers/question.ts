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
});
