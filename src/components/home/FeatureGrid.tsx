"use client";

import { useSettings } from "@/hooks/useSettings";
import { Handshake, FileText, Users, Building, Train, BookOpen, Gift, HelpCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

type Feature = {
  icon: LucideIcon;
  labelKey: string;
  href: string;
};

const features: Feature[] = [
  { icon: Handshake, labelKey: "feature_trade", href: "/trade" },
  { icon: FileText, labelKey: "feature_sauda", href: "/my-sauda" },
  { icon: Users, labelKey: "feature_community", href: "/community" },
  { icon: Building, labelKey: "feature_distributors", href: "/distributors" },
  { icon: Train, labelKey: "feature_rake", href: "/rake" },
  { icon: BookOpen, labelKey: "feature_khata", href: "/bahi-khata" },
  { icon: Gift, labelKey: "feature_promotion", href: "/promotion" },
  { icon: HelpCircle, labelKey: "feature_quiz", href: "/quiz" },
];

export default function FeatureGrid() {
  const { t } = useSettings();

  return (
    <div className="px-3 pb-4">
      <div className="grid grid-cols-4 gap-y-4">
        {features.map((feature, index) => (
          <Link href={feature.href} key={index} className="flex flex-col items-center justify-start gap-1.5 text-center group">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-accent group-hover:bg-primary/10 transition-colors">
              <feature.icon className="w-6 h-6 text-accent-foreground" />
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
