import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";

async function signupUser({ email, password, name }: { email: string; password: string; name?: string }) {
  const res = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.error || "Signup failed");

  await signIn("credentials", { email, password, callbackUrl: "/dashboard" });

  return data;
}

export function useSignup() {
  return useMutation({ mutationFn: signupUser });
}
