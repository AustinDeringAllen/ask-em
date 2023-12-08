import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getRecent: publicProcedure.query(async ({ ctx }) => {
    const users = await ctx.db.user.findMany({
      take: 5,
      where: {
        createdAt: {
          lte: new Date(),
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        image: true,
        _count: {
          select: {
            questions: true,
          },
        },
      },
    });

    return users;
  }),
  getUserPage: publicProcedure
    .input(z.object({ uid: z.string() }))
    .query(async ({ ctx, input }) => {
      const userPage = await ctx.db.user.findFirst({
        where: {
          id: input.uid,
        },
        select: {
          name: true,
          image: true,
          questions: {
            where: {
              answer: {
                some: {
                  body: { not: undefined },
                },
              },
            },
            orderBy: {
              createdAt: "desc",
            },
            select: {
              id: true,
              body: true,
              answer: {
                select: {
                  body: true,
                },
              },
            },
          },
        },
      });

      return userPage;
    }),
});
