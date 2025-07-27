"use client";

import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";

export function Navigation() {
  const { t } = useLanguage();

  const navItems = [
    { key: "home", href: "/" },
    { key: "properties", href: "/properties" },
    { key: "services", href: "/#services" },
  ];

  return (
    <nav className="hidden md:flex items-center gap-4 rtl:space-x-reverse mx-2">
      {navItems.map((item) => (
        <Link
          key={item.key}
          href={item.href}
          className="text-blue-950 hover:text-blue-600 transition-colors text-lg"
        >
          {t(`navigation.${item.key}`)}
        </Link>
      ))}
    </nav>
  );
}
