"use client";

import { Cable } from "lucide-react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Link from "next/link";

export function Footer() {
  const t = useTranslations("navigation");
  const locale = useLocale();

  return (
    <footer
      className="text-white"
      style={{ backgroundColor: "oklch(21.6% 0.006 56.043)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                <Cable className="text-cyan-500 h-5 w-5" />
              </div>
              <span className="text-cyan-500 font-bold text-xl">DojoLink</span>
            </div>
            <p className="text-gray-300 mb-4">
              Connecting the Swiss JiuJitsu community through events,
              competitions, and training opportunities.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`/${locale}`}
                  className="text-gray-300 hover:text-[#33b97a] transition-colors"
                >
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/events`}
                  className="text-gray-300 hover:text-[#33b97a] transition-colors"
                >
                  {t("events")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/about`}
                  className="text-gray-300 hover:text-[#33b97a] transition-colors"
                >
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/contact`}
                  className="text-gray-300 hover:text-[#33b97a] transition-colors"
                >
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-gray-300">
              <p>info@dojolink.ch</p>
              <p>+41 44 123 45 67</p>
              <p>Zurich, Switzerland</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 DojoLink. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
