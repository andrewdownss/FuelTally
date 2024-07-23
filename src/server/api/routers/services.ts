import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const serviceRouter = createTRPCRouter({
  addService: protectedProcedure
    .input(
      z.object({
        odometer: z.number(),
        service_type: z.string(),
        service_details: z.string(),
        price: z.number(),
        car_id: z.string(),
        supplier: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.services.create({
        data: {
          ...input,
          car_id: input.car_id,
        },
      });
    }),
  getService: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return ctx.db.services.findUnique({
        where: {
          id: input,
        },
      });
    }),
  getAllServices: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return ctx.db.services.findMany({
        where: {
          car_id: input,
        },
      });
    }),
  deleteService: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return ctx.db.services.delete({
        where: {
          id: input,
        },
      });
    }),
});
