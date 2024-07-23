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
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const response = await openai.chat.completions.create({
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: input },
        ],
        model: "gpt-4o-mini",
      });
      return response;
    }),
});
