"use client";

import { FaGithub, FaGoogle } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth/auth-client";

export default function SignInButtons() {
  return (
    <>
      <Button
        variant="outline"
        onClick={async () => {
          await signIn.social({ provider: "google" });
        }}>
        <FaGoogle />
        Sign in with Google
      </Button>
      <Button
        variant="outline"
        onClick={async () => {
          await signIn.social({ provider: "github" });
        }}>
        <FaGithub />
        Sign in with GitHub
      </Button>
    </>
  );
}
