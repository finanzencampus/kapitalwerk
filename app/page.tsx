import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import EconomyMap from "@/components/sections/EconomyMap";
import WealthSimulator from "@/components/sections/WealthSimulator";
import HistoryTimeline from "@/components/sections/HistoryTimeline";
import RiskLab from "@/components/sections/RiskLab";
import EtfCenter from "@/components/sections/EtfCenter";
import Psychology from "@/components/sections/Psychology";
import Inflation from "@/components/sections/Inflation";
import FutureTrends from "@/components/sections/FutureTrends";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <EconomyMap />
        <WealthSimulator />
        <HistoryTimeline />
        <RiskLab />
        <EtfCenter />
        <Psychology />
        <Inflation />
        <FutureTrends />
      </main>
      <Footer />
    </>
  );
}
