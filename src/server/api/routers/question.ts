import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const questionRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ body: z.string().min(1), uid: z.string().nullable() }))
    .mutation(async ({ ctx, input }) => {
      const newQuestion = await ctx.db.question.create({
        data: {
          uid: input.uid,
          body: input.body,
        },
      });

      return newQuestion;
    }),
  getAnsweredUserQuestions: publicProcedure
    .input(z.object({ uid: z.string() }))
    .query(async ({ ctx, input }) => {
      const userQuestions = ctx.db.question.findMany({
        where: {
          uid: input.uid,
          answer: {
            some: {
              body: { not: undefined },
            },
          },
        },
      });

      return userQuestions;
    }),
  getUserQuestions: publicProcedure
    .input(z.object({ uid: z.string() }))
    .query(async ({ ctx, input }) => {
      const userQuestions = ctx.db.question.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          uid: input.uid,
          NOT: {
            answer: {
              some: {
                body: undefined,
              },
            },
          },
        },
      });

      return userQuestions;
    }),
  deleteById: protectedProcedure
    .input(z.object({ qid: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const deleted = await ctx.db.question.delete({
        where: {
          id: input.qid,
          uid: ctx.session?.user.id,
        },
      });

      return deleted;
    }),
  getQuestionById: protectedProcedure
    .input(z.object({ qid: z.string() }))
    .query(async ({ ctx, input }) => {
      const question = await ctx.db.question.findFirst({
        where: {
          id: input.qid,
          uid: ctx.session.user.id,
        },
      });

      return question;
    }),
  getAllPublicQuestions: publicProcedure.query(async ({ ctx }) => {
    const questions = await ctx.db.question.findMany({
      where: {
        uid: null,
      },
      select: {
        id: true,
        body: true,
        createdAt: true,
      },
    });

    return questions;
  }),
});
