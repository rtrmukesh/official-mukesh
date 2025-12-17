"use client";
import OverlayModal from "@/components/OverlayModal";
import ProfileCard from "@/HomePage/components/ProfileCard/ProfileCard";
import AboutSection from "@/HomePage/components/Sections/about/AboutSection";
import HighlightsSection from "@/HomePage/components/Sections/about/HighlightsSection";
import PortfolioSection from "@/HomePage/components/Sections/about/PortfolioSection";
import ContactSection from "@/HomePage/components/Sections/contact";
import NavigationTab from "@/HomePage/components/Sections/NavigationTab";
import ResumeSection from "@/HomePage/components/Sections/resume";
import Image from "next/image";
import mukesh from "@/assets/images/mukesh-mg.png";

import { Fragment, useState } from "react";
import SkillSection from "@/HomePage/components/Sections/skills";
import IOS26TabMenu from "@/HomePage/components/Sections/IOS26TabMenu";

export default function Home() {
  const [tabIndex, setTabIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Fragment>
      <OverlayModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        body={
          <Image
            src={mukesh}
            alt="Mukesh M"
            width={500}
            height={500}
            className="object-cover w-full h-full rounded-xl 
           shadow-[0_0_10px_1px_rgba(255,255,255,0.5)] 
           transition-all duration-300"
            loading="lazy"
            priority={false}
          />
        }
      />
      <main className="bg-[#0b0b0d] text-white">
        <div className="w-full max-w-7xl mx-auto px-4 lg:px-10 py-12 min-h-[100vh]">
          {/* Desktop | Two Column */}
          <div className="hidden lg:flex gap-[2.3%]">
            {/* Left Sticky ProfileCard */}
            <div className="flex-shrink-0 sticky top-8 self-start border border-white/15 rounded-3xl  backdrop-blur-sm">
              <ProfileCard setIsOpen={setIsOpen} />
            </div>

            {/* Right Scrollable Content */}
            <div className="flex-1  border border-white/15  rounded-[1.25rem]  backdrop-blur-sm">
              <NavigationTab setTabIndex={setTabIndex} tabIndex={tabIndex} />
              {tabIndex == 0 && (
                <>
                  <AboutSection />
                  <HighlightsSection />
                  <PortfolioSection />
                </>
              )}

              {tabIndex == 1 && <ResumeSection />}
              {tabIndex == 3 && <ContactSection />}
              {tabIndex == 2 && <SkillSection />}
            </div>
          </div>

          {/* Mobile | Single Column */}
          <div className="lg:hidden space-y-7 pb-28">
            <ProfileCard isMobile={true} setIsOpen={setIsOpen} />
            <div className="relative">
              <IOS26TabMenu setActiveIndex={setTabIndex} activeIndex={tabIndex}>
                <>
                  <AboutSection />
                  <HighlightsSection />
                  <PortfolioSection />
                </>
                <ResumeSection />
                <SkillSection />
                <ContactSection />
              </IOS26TabMenu>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
}
