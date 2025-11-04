import type { ReactNode } from "react";
import BottomNav from "@/components/layout/BottomNav";
import { SettingsProvider } from "@/contexts/SettingsContext";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <SettingsProvider>
      <div className="bg-neutral-200 dark:bg-neutral-900 min-h-screen flex justify-center">
        <div className="w-full max-w-md bg-background relative flex flex-col shadow-lg">
          <main className="flex-1 overflow-y-auto pb-20">{children}</main>
          <BottomNav />
        </div>
      </div>
    </SettingsProvider>
  );
}
