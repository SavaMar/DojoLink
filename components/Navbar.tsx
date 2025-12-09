"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, Cable, Menu, X, User } from "lucide-react";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getLocalizedPath = (newLocale: string) => {
    const pathWithoutLocale = pathname.replace(`/${locale}`, "");
    return `/${newLocale}${pathWithoutLocale}`;
  };

  const handleLoginToggle = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <nav
      className="text-white shadow-lg"
      style={{ backgroundColor: "rgb(20, 24, 27)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <Cable
                className="h-5 w-5"
                style={{ color: "rgb(3, 126, 168)" }}
              />
            </div>
            <span
              className="font-bold text-xl"
              style={{ color: "rgb(228, 80, 56)" }}
            >
              DojoLink
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href={`/${locale}/events`}
              className="transition-colors"
              style={
                {
                  color: "white",
                  "--hover-color": "rgb(3, 126, 168)",
                } as React.CSSProperties
              }
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgb(3, 126, 168)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.color = "white")}
            >
              {t("events")}
            </Link>
          </div>

          {/* Desktop Right Side - Login/Avatar and Language */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <Image
                  src="https://ufclivepubstorage.blob.core.windows.net/public-files/05aec0dc-feda-44f4-a1ef-07c2813980ed%2FNURMAGOMEDOV_KHABIB_BELT_10-24.png"
                  alt="User Avatar"
                  width={32}
                  height={32}
                  className="rounded-full object-cover border-2"
                  style={{ borderColor: "rgb(3, 126, 168)" }}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLoginToggle}
                  className="text-white transition-colors"
                  style={
                    {
                      backgroundColor: "rgb(63, 67, 70)",
                      "--hover-bg": "rgb(3, 126, 168)",
                    } as React.CSSProperties
                  }
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "rgb(3, 126, 168)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "rgb(63, 67, 70)")
                  }
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLoginToggle}
                className="text-white transition-colors"
                style={
                  {
                    backgroundColor: "rgb(63, 67, 70)",
                    "--hover-bg": "rgb(3, 126, 168)",
                  } as React.CSSProperties
                }
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "rgb(3, 126, 168)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "rgb(63, 67, 70)")
                }
              >
                Login
              </Button>
            )}

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white transition-colors"
                  style={
                    {
                      backgroundColor: "rgb(63, 67, 70)",
                      "--hover-bg": "rgb(3, 126, 168)",
                    } as React.CSSProperties
                  }
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "rgb(3, 126, 168)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "rgb(63, 67, 70)")
                  }
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

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {isLoggedIn ? (
              <Image
                src="https://ufclivepubstorage.blob.core.windows.net/public-files/05aec0dc-feda-44f4-a1ef-07c2813980ed%2FNURMAGOMEDOV_KHABIB_BELT_10-24.png"
                alt="User Avatar"
                width={32}
                height={32}
                className="rounded-full object-cover border-2"
                style={{ borderColor: "rgb(3, 126, 168)" }}
              />
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLoginToggle}
                className="text-white transition-colors p-2"
                style={
                  {
                    backgroundColor: "rgb(63, 67, 70)",
                    "--hover-bg": "rgb(3, 126, 168)",
                  } as React.CSSProperties
                }
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "rgb(3, 126, 168)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "rgb(63, 67, 70)")
                }
              >
                <User className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white transition-colors p-2"
              style={
                {
                  backgroundColor: "rgb(63, 67, 70)",
                  "--hover-bg": "rgb(3, 126, 168)",
                } as React.CSSProperties
              }
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "rgb(3, 126, 168)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "rgb(63, 67, 70)")
              }
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div
              className="px-2 pt-2 pb-3 space-y-1 border-t"
              style={{
                backgroundColor: "rgb(20, 24, 27)",
                borderColor: "rgb(63, 67, 70)",
              }}
            >
              <Link
                href={`/${locale}/events`}
                className="block px-3 py-2 text-white transition-colors"
                style={{
                  color: "white",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "rgb(3, 126, 168)")
                }
                onMouseLeave={(e) => (e.currentTarget.style.color = "white")}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("events")}
              </Link>
              {isLoggedIn && (
                <button
                  onClick={() => {
                    handleLoginToggle();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-white transition-colors"
                  style={{
                    color: "white",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "rgb(3, 126, 168)")
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.color = "white")}
                >
                  Logout
                </button>
              )}
              <div className="px-3 py-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white transition-colors w-full justify-start"
                      style={
                        {
                          backgroundColor: "rgb(63, 67, 70)",
                          "--hover-bg": "rgb(3, 126, 168)",
                        } as React.CSSProperties
                      }
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          "rgb(3, 126, 168)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          "rgb(63, 67, 70)")
                      }
                    >
                      <Globe className="h-4 w-4 mr-2" />
                      {locales.find((l) => l.code === locale)?.name}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-full">
                    {locales.map((loc) => (
                      <DropdownMenuItem key={loc.code} asChild>
                        <Link href={getLocalizedPath(loc.code)}>
                          {loc.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
