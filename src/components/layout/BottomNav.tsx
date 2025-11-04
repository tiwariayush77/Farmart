"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BadgeIndianRupee, Truck, Snowflake, Bot } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", icon: Home, labelKey: "nav_home" },
  { href: "/trade", icon: BadgeIndianRupee, labelKey: "nav_trade" },
  { href: "/my-sauda", icon: Truck, labelKey: "nav_sauda" },
  { href: "/community", icon: Snowflake, labelKey: "nav_community" },
  { href: "/ai-chat", icon: Bot, labelKey: "nav_ai" },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { t } = useSettings();

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-card border-t border-border shadow-t-lg z-30">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          // Special case for root to avoid matching all child routes
          const isActive = item.href === '/' ? pathname === item.href : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link href={item.href} key={item.href} className="flex-1 flex justify-center items-center h-full" aria-label={t(item.labelKey as any)}>
              <div
                className={cn(
                  "flex flex-col items-center gap-1 p-2 rounded-lg transition-colors duration-200 w-[70px]",
                  isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent"
                )}
              >
                <Icon className="h-6 w-6" />
                <span className="text-xs font-medium">
                  {t(item.labelKey as any)}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
