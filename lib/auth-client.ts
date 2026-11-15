import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  sessionOptions: {
    refetchInterval: 30,
  },
});

export const { signIn, signUp, useSession, signOut } = authClient;
