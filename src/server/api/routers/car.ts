import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const carRouter = createTRPCRouter({
  addCar: protectedProcedure
    .input(
      z.object({
        make: z.string(),
        model: z.string(),
        year: z.number(),
        vin: z.string(),
        epaClass: z.string(),
        cylinders: z.number(),
        fuelType: z.string(),
        horsePower: z.number(),
        torque: z.number(),
        driveType: z.string(),
        transmission: z.string(),
        fuelCity: z.number(),
        fuelHighway: z.number(),
        miles: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.car.create({
        data: {
          ...input,
          userId: ctx.session.user.id,
        },
      });
    }),
  getCar: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return ctx.db.car.findUnique({
      where: {
        id: input,
        userId: ctx.session.user.id,
      },
    });
  }),
  getAllCars: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.car.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
  deleteCar: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return ctx.db.car.delete({
        where: {
          id: input,
        },
      });
    }),
});
