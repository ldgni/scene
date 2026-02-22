"use client";

import { useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth/auth-client";

export default function SignInButtons() {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        disabled={loading}
        onClick={async () => {
          await signIn.social({
            provider: "google",
            fetchOptions: {
              onRequest: () => {
                setLoading(true);
              },
              onResponse: () => {
                setLoading(false);
              },
            },
          });
        }}>
        <FaGoogle />
        Sign in with Google
      </Button>
      <Button
        variant="outline"
        disabled={loading}
        onClick={async () => {
          await signIn.social({
            provider: "github",
            fetchOptions: {
              onRequest: () => {
                setLoading(true);
              },
              onResponse: () => {
                setLoading(false);
              },
            },
          });
        }}>
        <FaGithub />
        Sign in with GitHub
      </Button>
    </>
  );
}
