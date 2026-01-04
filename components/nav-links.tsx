"use client";

import { CheckCircle, Clock, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  authRequired?: boolean;
}

const navItems: NavItem[] = [
  {
    href: "/",
    label: "Home",
    icon: Home,
  },
  {
    href: "/plan-to-watch",
    label: "Plan to watch",
    icon: Clock,
    authRequired: true,
  },
  {
    href: "/watched",
    label: "Watched",
    icon: CheckCircle,
    authRequired: true,
  },
];

interface NavLinksProps {
  isAuthenticated?: boolean;
}

export default function NavLinks({ isAuthenticated = false }: NavLinksProps) {
  const pathname = usePathname();

  const filteredNavItems = navItems.filter(
    (item) => !item.authRequired || isAuthenticated,
  );

  return (
    <nav>
      <ul className="flex gap-2">
        {filteredNavItems.map((item) => (
          <li key={item.href}>
            <Button
              variant="ghost"
              asChild
              className={pathname === item.href ? "bg-accent" : ""}>
              <Link href={item.href}>
                <span className="sm:hidden">
                  <item.icon />
                </span>
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
