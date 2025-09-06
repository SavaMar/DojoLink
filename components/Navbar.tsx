"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, Cable } from "lucide-react";

const locales = [
  { code: "en", name: "English" },
  { code: "de", name: "Deutsch" },
  { code: "fr", name: "Français" },
  { code: "it", name: "Italiano" },
];

export function Navbar() {
  const t = useTranslations("navigation");
  const locale = useLocale();
  const pathname = usePathname();

  const getLocalizedPath = (newLocale: string) => {
    const pathWithoutLocale = pathname.replace(`/${locale}`, "");
    return `/${newLocale}${pathWithoutLocale}`;
  };

  return (
    <nav
      className="text-white shadow-lg"
      style={{ backgroundColor: "oklch(21.6% 0.006 56.043)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <Cable className="text-cyan-500 h-5 w-5" />
            </div>
            <span className="text-cyan-500 font-bold text-xl">DojoLink</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href={`/${locale}`}
              className="hover:text-[#33b97a] transition-colors"
            >
              {t("home")}
            </Link>
            <Link
              href={`/${locale}/events`}
              className="hover:text-[#33b97a] transition-colors"
            >
              {t("events")}
            </Link>
            <Link
              href={`/${locale}/about`}
              className="hover:text-[#33b97a] transition-colors"
            >
              {t("about")}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="hover:text-[#33b97a] transition-colors"
            >
              {t("contact")}
            </Link>
          </div>

          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:text-[#33b97a]"
              >
                <Globe className="h-4 w-4 mr-2" />
                {locales.find((l) => l.code === locale)?.name}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {locales.map((loc) => (
                <DropdownMenuItem key={loc.code} asChild>
                  <Link href={getLocalizedPath(loc.code)}>{loc.name}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
