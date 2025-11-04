import Header from "@/components/layout/Header";
import SearchBar from "@/components/shared/SearchBar";
import Hero from "@/components/home/Hero";
import FeatureGrid from "@/components/home/FeatureGrid";
import SmartNotificationsCard from "@/components/ai/SmartNotificationsCard";
import { Separator } from "@/components/ui/separator";

export default function HomePage() {
  return (
    <>
      <Header />
      <SearchBar />
      <Hero />
      <FeatureGrid />
      <Separator className="my-2"/>
      <SmartNotificationsCard />
    </>
  );
}
