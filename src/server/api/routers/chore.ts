import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { choreDataSchema } from "../../../utils/schemas";

export const choreRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.chore.findMany();
  }),
  create: publicProcedure.input(choreDataSchema).mutation(({ input, ctx }) => {
    return ctx.prisma.chore.create({
      data: {
        name: input.name,
        intervalDays: input.intervalDays,
        lastCompletedAt: input.lastCompletedAt ?? new Date(),
      },
    });
  }),
  complete: publicProcedure
    .input(
      z.object({
        choreId: z.string(),
        completedBy: z.string(),
        completedAt: z.date().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.$transaction([
        ctx.prisma.choreCompletions.create({
          data: {
            choreId: input.choreId,
            completedBy: input.completedBy,
            completedAt: input.completedAt ?? new Date(),
          },
        }),
        ctx.prisma.chore.update({
          where: { id: input.choreId },
          data: { lastCompletedAt: input.completedAt ?? new Date() },
        }),
      ]);
    }),
  edit: publicProcedure
    .input(
      z.object({
        choreId: z.string().uuid(),
        newChore: choreDataSchema,
      })
    )
    .mutation(({ input, ctx }) => {
      const editedChore = ctx.prisma.chore.update({
        where: { id: input.choreId },
        data: input.newChore,
      });

      return editedChore;
    }),
});
