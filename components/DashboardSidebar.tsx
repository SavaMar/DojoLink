"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Home,
  Calendar,
  Users,
  Settings,
  BarChart3,
  Bell,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface DashboardSidebarProps {
  dojo: string;
  locale: string;
}

const navigation = [
  { name: "Overview", href: "overview", icon: Home },
  { name: "Events", href: "events", icon: Calendar },
  { name: "Dojo Members", href: "members", icon: Users },
  { name: "Instructors", href: "instructors", icon: Users },
  { name: "Trial apply", href: "trial-applications", icon: Users, hasNotification: true },
  { name: "Analytics", href: "analytics", icon: BarChart3 },
  { name: "Notifications", href: "notifications", icon: Bell },
  { name: "Settings", href: "settings", icon: Settings },
];

export function DashboardSidebar({ dojo, locale }: DashboardSidebarProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    const basePath = `/mydojo/${locale}/${dojo}`;
    if (href === "overview") {
      return pathname === basePath;
    }
    return pathname.startsWith(`${basePath}/${href}`);
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-4 w-4" />
          ) : (
            <Menu className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
        style={{
          backgroundColor: "rgb(20, 24, 27)",
          borderRightColor: "rgb(63, 67, 70)",
        }}
      >
        <div className="flex flex-col h-full">
          {/* Logo/Header */}
          <div
            className="flex items-center justify-center h-16 px-6 border-b"
            style={{ borderBottomColor: "rgb(63, 67, 70)" }}
          >
            <h1
              className="text-lg font-semibold"
              style={{ color: "rgb(255, 255, 255)" }}
            >
              Naster Nyon
            </h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const href =
                item.href === "overview"
                  ? `/mydojo/${locale}/${dojo}`
                  : `/mydojo/${locale}/${dojo}/${item.href}`;

              return (
                <Link
                  key={item.name}
                  href={href}
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors"
                  style={{
                    backgroundColor: isActive(item.href)
                      ? "rgb(3, 126, 168)"
                      : "transparent",
                    color: isActive(item.href)
                      ? "rgb(255, 255, 255)"
                      : "rgb(180, 180, 180)",
                    borderRight: isActive(item.href)
                      ? "2px solid rgb(3, 126, 168)"
                      : "none",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive(item.href)) {
                      e.currentTarget.style.backgroundColor = "rgb(63, 67, 70)";
                      e.currentTarget.style.color = "rgb(255, 255, 255)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(item.href)) {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "rgb(180, 180, 180)";
                    }
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <Icon className="mr-3 h-5 w-5" />
                    {item.name}
                    {item.hasNotification && (
                      <div className="ml-2 relative">
                        <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* User info */}
          <div
            className="p-4 border-t"
            style={{ borderTopColor: "rgb(63, 67, 70)" }}
          >
            <div className="flex items-center space-x-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "rgb(63, 67, 70)" }}
              >
                <span
                  className="text-sm font-medium"
                  style={{ color: "rgb(180, 180, 180)" }}
                >
                  MS
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm font-medium truncate"
                  style={{ color: "rgb(255, 255, 255)" }}
                >
                  Marco Silva
                </p>
                <p
                  className="text-xs truncate"
                  style={{ color: "rgb(180, 180, 180)" }}
                >
                  Owner
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
