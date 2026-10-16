import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhySection from "@/components/why/WhySection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <WhySection />
      </main>
    </>
  );
}
