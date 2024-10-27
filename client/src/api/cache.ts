import { revalidatePath } from "next/cache";
import "server-only";

export const revalidateCache = async (path: string) => {
  "use server";

  revalidatePath(path);
};
