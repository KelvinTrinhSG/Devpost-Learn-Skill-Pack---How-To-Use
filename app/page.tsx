import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhySection from "@/components/why/WhySection";
import TipsSection from "@/components/TipsSection";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <WhySection />
        <TipsSection />
      </main>
      <SiteFooter />
    </>
  );
}
