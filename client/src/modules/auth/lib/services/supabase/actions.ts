"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "./server";

type Credentials = {
  email: string;
  password: string;
};

export async function signin({ email, password }: Credentials) {
  const supabase = await createClient();

  const data = {
    email,
    password,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    throw error;
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }

  revalidatePath("/", "layout");
  redirect("/");
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

export async function onboarded() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not found");
  }

  const { error } = await supabase.auth.updateUser({
    data: { onboarded: true },
  });

  if (error) {
    throw error;
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}
