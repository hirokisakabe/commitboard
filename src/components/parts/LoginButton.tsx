"use client";

import { signIn } from "next-auth/react";
import { Button } from "@tremor/react";

export function LoginButton() {
  return (
    <Button variant="secondary" size="xl" onClick={() => signIn()}>
      Sign in with GitHub
    </Button>
  );
}
