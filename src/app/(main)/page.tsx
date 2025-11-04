import Header from "@/components/layout/Header";
import SearchBar from "@/components/shared/SearchBar";
import AiSmartCard from "@/components/home/AiSmartCard";
import FeatureGrid from "@/components/home/FeatureGrid";
import SmartNotificationsCard from "@/components/ai/SmartNotificationsCard";
import { Separator } from "@/components/ui/separator";

export default function HomePage() {
  return (
    <>
      <Header />
      <SearchBar />
      <AiSmartCard />
      <FeatureGrid />
      <Separator className="my-2"/>
      <SmartNotificationsCard />
    </>
  );
}
