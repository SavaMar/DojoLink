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
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo/Header */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">DN</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  DojoLink
                </h1>
                <p className="text-xs text-gray-500 capitalize">
                  {dojo.replace("-", " ")}
                </p>
              </div>
            </div>
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
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                    isActive(item.href)
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User info */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-600 text-sm font-medium">MS</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  Marco Silva
                </p>
                <p className="text-xs text-gray-500 truncate">Owner</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
