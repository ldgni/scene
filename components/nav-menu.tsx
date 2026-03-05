"use client";

import { Menu } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navItems = [
  { url: "/", name: "Home" },
  { url: "/watchlist", name: "Watchlist", protected: true },
];

export default function NavMenu({ isLoggedIn }: { isLoggedIn: boolean }) {
  const allNavItems = navItems.filter((item) => !item.protected || isLoggedIn);

  return (
    <>
      {/* Mobile Menu */}
      <Sheet>
        <SheetTrigger className="sm:hidden" asChild>
          <Button variant="ghost" size="icon" aria-label="Toggle menu">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Scene</SheetTitle>
            <SheetDescription>Menu</SheetDescription>
          </SheetHeader>
          <nav className="px-4">
            <ul className="space-y-4">
              {allNavItems.map((item) => (
                <li key={item.url}>
                  <SheetClose asChild>
                    <Link href={item.url}>{item.name}</Link>
                  </SheetClose>
                </li>
              ))}
            </ul>
          </nav>
        </SheetContent>
      </Sheet>

      {/* Desktop Menu */}
      <NavigationMenu className="hidden sm:block">
        <NavigationMenuList className="gap-4 font-medium">
          {allNavItems.map((item) => (
            <NavigationMenuItem key={item.url}>
              <NavigationMenuLink asChild>
                <Link href={item.url}>{item.name}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}
