import { env } from "@/lib/utils";
import { cookies } from "next/headers";
import "server-only";

interface RequestConfig<T> {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  url: string;
  params?: T;
  headers?: never;
}

export async function apiRequest<D = unknown, R = unknown, E = Error>({
  url,
  method,
  params,
}: RequestConfig<D>) {
  const body = JSON.stringify(params);
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    "Access-Control-Allow-Headers": "*",
  };

  const token = cookies().get("session")?.value;

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const init: RequestInit = {
    method,
    headers,
    body: method === "GET" ? undefined : body,
  };

  const response = await fetch(`${env.NEXT_PUBLIC_API_URL}${url}`, init);

  if (!response.ok) {
    return new Error(response.statusText) as E;
  }

  const data = (await response.json()) as R;
  return data;
}
