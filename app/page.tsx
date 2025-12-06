"use client";
import ProfileCard from "@/HomePage/components/ProfileCard/ProfileCard";
import AboutSection from "@/HomePage/components/Sections/AboutSection";
import HighlightsSection from "@/HomePage/components/Sections/HighlightsSection";
import NavigationTab from "@/HomePage/components/Sections/NavigationTab";
import PortfolioSection from "@/HomePage/components/Sections/PortfolioSection";
import { useState } from "react";

export default function Home() {
  const [tabIndex, setTabIndex] = useState(0)
  return (
    <main className="bg-[#0b0b0d] text-white">
      <div className="w-full max-w-7xl mx-auto px-4 lg:px-10 py-12">
        {/* Desktop | Two Column */}
        <div className="hidden lg:flex gap-[2.3%]">
          {/* Left Sticky ProfileCard */}
          <div className="flex-shrink-0 sticky top-8 self-start border border-white/15 rounded-3xl  backdrop-blur-sm">
            <ProfileCard />
          </div>

          {/* Right Scrollable Content */}
          <div className="flex-1  border border-white/15  rounded-[1.25rem]  backdrop-blur-sm">
            <NavigationTab setTabIndex={setTabIndex} tabIndex={tabIndex}/>
            <AboutSection />
            <HighlightsSection />
            <PortfolioSection />
          </div>
        </div>

        {/* Mobile | Single Column */}
        <div className="lg:hidden space-y-7 pb-28">
          <ProfileCard isMobile={true} />
          <div className="relative">
            <NavigationTab setTabIndex={setTabIndex} tabIndex={tabIndex}/>
            <AboutSection />
            <HighlightsSection />
            <PortfolioSection />
          </div>
        </div>
      </div>

    </main>
  );
}
