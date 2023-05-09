import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getInfo: publicProcedure
    .input(z.object({ uid: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.user.findUnique({
        where: {
          id: input.uid,
        },
        select: {
          id: true,
          name: true,
          image: true,
        },
      });
    }),
});
