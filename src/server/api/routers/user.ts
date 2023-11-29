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
});
