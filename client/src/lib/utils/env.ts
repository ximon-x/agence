import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_APP_URL: z
      .string()
      .min(1, { message: "APP URL is required" })
      .url({ message: "APP URL is not valid" }),

    NEXT_PUBLIC_API_URL: z
      .string()
      .min(1, { message: "API URL is required" })
      .url({ message: "API URL is not valid" }),

    NEXT_PUBLIC_DOC_URL: z
      .string()
      .min(1, { message: "DOC URL is required" })
      .url({ message: "DOC URL is not valid" }),

    NEXT_PUBLIC_CODE_URL: z
      .string()
      .min(1, { message: "Source code URL is required" })
      .url({ message: "Source code URL is not valid" }),

    NEXT_PUBLIC_WALLET_URL: z
      .string()
      .min(1, { message: "WALLET URL is required" })
      .url({ message: "WALLET URL is not valid" }),

    NEXT_PUBLIC_SUPABASE_URL: z
      .string()
      .min(1, { message: "Supabase URL is required" })
      .url({ message: "Supabase URL is not valid" }),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z
      .string()
      .min(20, { message: "Supabase anon key is required" }),
  },

  runtimeEnv: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_DOC_URL: process.env.NEXT_PUBLIC_DOC_URL,
    NEXT_PUBLIC_CODE_URL: process.env.NEXT_PUBLIC_CODE_URL,
    NEXT_PUBLIC_WALLET_URL: process.env.NEXT_PUBLIC_WALLET_URL,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
});
