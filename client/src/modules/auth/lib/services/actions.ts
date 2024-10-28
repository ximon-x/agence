"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "./supabase/server";

type Credentials = {
  email: string;
  password: string;
};

export async function login({
  email,
  password,
}: Credentials): Promise<Error | void> {
  const supabase = await createClient();

  const data = {
    email,
    password,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return error;
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signup({ email, password }: Credentials) {
  const supabase = await createClient();

  const data = {
    email,
    password,
    options: {
      data: {
        onboarded: false,
      },
    },
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    throw error;
  }

  revalidatePath("/", "layout");
  redirect("/onboarding");
}
