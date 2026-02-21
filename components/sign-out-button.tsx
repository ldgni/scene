"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth/auth-client";

export default function SignOutButton() {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      onClick={async () =>
        await signOut({
          fetchOptions: {
            onSuccess: () => {
              router.refresh();
            },
          },
        })
      }>
      Sign out
    </Button>
  );
}
