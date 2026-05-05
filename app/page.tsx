import { StickyTopBar } from "@/components/sticky-top-bar";
import { Hero } from "@/components/hero";
import { WhyUs } from "@/components/why-us";
import { Services } from "@/components/services";
import { ZipCoverage } from "@/components/zip-coverage";
import { ServiceArea } from "@/components/service-area";
import { Process } from "@/components/process";
import { RecentJobs } from "@/components/recent-jobs";
import { Testimonials } from "@/components/testimonials";
import { Financing } from "@/components/financing";
import { FAQ } from "@/components/faq";
import { FinalCTA } from "@/components/final-cta";
import { Footer } from "@/components/footer";
import { MobileCallButton } from "@/components/mobile-call-button";
import { ExitIntent } from "@/components/exit-intent";
import { ActivityTicker } from "@/components/activity-ticker";

export default function HomePage() {
  return (
    <>
      <StickyTopBar />
      <main id="top" className="relative">
        <Hero />
        <WhyUs />
        <Services />
        <ZipCoverage />
        <ServiceArea />
        <Process />
        <RecentJobs />
        <Testimonials />
        <Financing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <MobileCallButton />
      <ActivityTicker />
      <ExitIntent />
    </>
  );
}
