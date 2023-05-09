import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { pusherServerClient } from "~/server/helpers/pusher";

export const answerRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        qid: z.string(),
        body: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const newAnswer = await ctx.prisma.answer.create({
        data: {
          qid: input.qid,
          body: input.body,
        },
      });

      await pusherServerClient.trigger(
        `user-${ctx.session.user.id}`,
        "new-answer",
        {
          answer: newAnswer,
        }
      );

      return newAnswer;
    }),
});
