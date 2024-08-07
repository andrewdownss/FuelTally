import { z } from "zod";
import { env } from "@/env";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

import OpenAI from "openai";

const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });

export const aiRouter = createTRPCRouter({
  getAnswer: publicProcedure
    .input(
      z.object({
        question: z.string(),
        car_details: z.object({
          id: z.string(),
          userID: z.optional(z.string()),
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
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const prompt = `
      Here is the vehicle details: 
      {
        "id": "${input.car_details.id}",
        
        "make": "${input.car_details.make}",
        "model": "${input.car_details.model}",
        "year": ${input.car_details.year},
        
        "epaClass": "${input.car_details.epaClass}",
        "cylinders": ${input.car_details.cylinders},
        "fuelType": "${input.car_details.fuelType}",
        "horsePower": ${input.car_details.horsePower},
        "torque": ${input.car_details.torque},
        "driveType": "${input.car_details.driveType}",

    }

        user question: ${input.question}

        Respond in only a few sentences. The response should only be relevant to the vehicle information. Answer the users question.
     `;

      const response = await openai.chat.completions.create({
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: prompt },
        ],
        model: "gpt-4o-mini",
      });
      return response;
    }),
});
