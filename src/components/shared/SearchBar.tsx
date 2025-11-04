"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSettings } from "@/hooks/useSettings";

export default function SearchBar() {
  const { t } = useSettings();
  return (
    <div className="px-3 pb-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder={t('search_placeholder')}
          className="pl-10 rounded-full bg-card border-border h-11"
        />
      </div>
    </div>
  );
}
