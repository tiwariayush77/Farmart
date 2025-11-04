'use client';

import type { ReactNode } from "react";
import BottomNav from "@/components/layout/BottomNav";
import { useSettings } from "@/hooks/useSettings";
import { useEffect } from "react";

function AppContainer({ children }: { children: ReactNode }) {
  const { language } = useSettings();

  useEffect(() => {
    // This hook will only run on the client, so it's safe to access document
    document.documentElement.lang = language;
  }, [language]);

  return (
    <div className="bg-neutral-200 dark:bg-neutral-900 min-h-screen flex justify-center">
      <div className="w-full max-w-md bg-background relative flex flex-col shadow-lg">
        <main className="flex-1 overflow-y-auto pb-20">{children}</main>
        <BottomNav />
      </div>
    </div>
  )
}

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <AppContainer>{children}</AppContainer>
  );
}
