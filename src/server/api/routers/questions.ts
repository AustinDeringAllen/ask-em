import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { pusherServerClient } from "~/server/helpers/pusher";

export const questionRouter = createTRPCRouter({
  getAllUnanswered: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.question.findMany({
      where: {
        uid: ctx.session.user.id,
        answer: null,
      },
    });
  }),
  getAllUnansweredLength: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.question.count({
      where: {
        uid: ctx.session.user.id,
        answer: null,
      },
    });
  }),
  getAllAnswered: publicProcedure
    .input(
      z.object({
        uid: z.string(),
      })
    )
    .query(({ input, ctx }) => {
      return ctx.prisma.question.findMany({
        where: {
          uid: input.uid,
          NOT: {
            answer: null,
          },
        },
        include: {
          answer: true,
        },
      });
    }),
  create: publicProcedure
    .input(
      z.object({
        uid: z.string(),
        body: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const newQuestion = await ctx.prisma.question.create({
        data: {
          uid: input.uid,
          body: input.body,
        },
      });

      await pusherServerClient.trigger(`user-${input.uid}`, "new-question", {
        question: newQuestion,
      });

      return newQuestion;
    }),
});
