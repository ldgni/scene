"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth/auth-client";

export default function SignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <Button
      variant="outline"
      disabled={loading}
      onClick={async () =>
        await signOut({
          fetchOptions: {
            onSuccess: () => {
              router.refresh();
            },
            onRequest: () => {
              setLoading(true);
            },
            onResponse: () => {
              setLoading(false);
            },
          },
        })
      }>
      Sign out
    </Button>
  );
}
