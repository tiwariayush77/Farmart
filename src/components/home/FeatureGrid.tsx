"use client";

import { useSettings } from "@/hooks/useSettings";
import { Handshake, FileText, Users, Building, Train, BookOpen, Gift, HelpCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Feature = {
  icon: LucideIcon;
  labelKey: string;
  href: string;
  hasAi?: boolean;
};

const features: Feature[] = [
  { icon: Handshake, labelKey: "feature_trade", href: "/trade", hasAi: true },
  { icon: FileText, labelKey: "feature_sauda", href: "/my-sauda", hasAi: true },
  { icon: Users, labelKey: "feature_community", href: "/community", hasAi: true },
  { icon: Building, labelKey: "feature_distributors", href: "/distributors" },
  { icon: Train, labelKey: "feature_rake", href: "/rake" },
  { icon: BookOpen, labelKey: "feature_khata", href: "/bahi-khata", hasAi: true },
  { icon: Gift, labelKey: "feature_promotion", href: "/promotion", hasAi: true },
  { icon: HelpCircle, labelKey: "feature_quiz", href: "/quiz" },
];

export default function FeatureGrid() {
  const { t } = useSettings();

  return (
    <div className="px-3 pb-4">
      <div className="grid grid-cols-4 gap-y-4">
        {features.map((feature, index) => (
          <Link href={feature.href} key={index} className="flex flex-col items-center justify-start gap-1.5 text-center group">
            <div className="relative w-12 h-12 rounded-full flex items-center justify-center bg-accent group-hover:bg-primary/10 transition-colors">
              <feature.icon className="w-6 h-6 text-accent-foreground" />
              {feature.hasAi && (
                <div className="absolute -top-1 -right-1 w-4 h-4 text-xs rounded-full flex items-center justify-center bg-primary text-primary-foreground select-none">
                  <span className="scale-75">🤖</span>
                </div>
              )}
            </div>
            <p className="text-xs text-foreground font-medium" style={{ fontSize: '11px' }}>
              {t(feature.labelKey as any)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
