import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Dojo Dashboard - DojoLink",
  description: "Manage your dojo space and events",
};

export default async function DojoLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string; dojo: string }>;
}) {
  const resolvedParams = await params;
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <div className="min-h-screen bg-gray-50">
        <div className="flex h-screen">
          <DashboardSidebar
            dojo={resolvedParams.dojo}
            locale={resolvedParams.locale}
          />
          <main className="flex-1 overflow-auto">
            <div className="p-6">{children}</div>
          </main>
        </div>
        <Toaster />
      </div>
    </NextIntlClientProvider>
  );
}
