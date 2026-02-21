import { Github } from "lucide-react";

import ModeToggle from "@/components/mode-toggle";
import NavMenu from "@/components/nav-menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Header() {
  return (
    <header className="mx-auto flex w-full max-w-2xl items-center justify-between p-4">
      <NavMenu />
      <div className="flex h-4 items-center gap-2">
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
