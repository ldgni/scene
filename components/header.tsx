import { Github } from "lucide-react";
import { headers } from "next/headers";

import ModeToggle from "@/components/mode-toggle";
import NavMenu from "@/components/nav-menu";
import SignOutButton from "@/components/sign-out-button";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth";

export default async function Header() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <header className="mx-auto flex w-full max-w-2xl items-center justify-between p-4">
      <NavMenu isLoggedIn={!!session} />
      <div className="flex h-4 items-center gap-2">
        {session && (
          <>
            <SignOutButton />
            <Separator orientation="vertical" />
          </>
        )}
        <Button variant="ghost" size="icon" asChild>
          <a
            href="https://github.com/ldgni/scene"
            target="_blank"
            aria-label="View source on GitHub">
            <Github />
          </a>
        </Button>
        <Separator orientation="vertical" />
        <ModeToggle />
      </div>
    </header>
  );
}
