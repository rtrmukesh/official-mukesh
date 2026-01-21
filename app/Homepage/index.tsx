"use client";
import logo from "@/assets/images/logo.svg";
import mukesh from "@/assets/images/mukesh-mg.png";
import OverlayModal from "@/components/OverlayModal";
import ProfileCard from "@/HomePage/components/ProfileCard/ProfileCard";
import AboutSection from "@/HomePage/components/Sections/about/AboutSection";
import HighlightsSection from "@/HomePage/components/Sections/about/HighlightsSection";
import PortfolioSection from "@/HomePage/components/Sections/about/PortfolioSection";
import ContactSection from "@/HomePage/components/Sections/contact";
import NavigationTab from "@/HomePage/components/Sections/NavigationTab";
import ResumeSection from "@/HomePage/components/Sections/resume";
import { motion } from "framer-motion";
import Image from "next/image";

import IOS26TabMenu from "@/HomePage/components/Sections/IOS26TabMenu";
import SkillSection from "@/HomePage/components/Sections/skills";
import { useState } from "react";
import QRCode from "react-qr-code";
import ToolSection from "@/HomePage/components/Sections/Tool";

const HomePageClient = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);

  const vcardData = `BEGIN:VCARD
VERSION:3.0
N:Mukesh;;;;
FN:Mukesh M
ORG:Mukesh
TITLE:Software Developer
TEL;TYPE=CELL:+919786587013
EMAIL:contact@themukesh.com
URL:https://themukesh.com
END:VCARD`;

  return (
    <div style={{ minWidth: "40vh" }}>
      {/* ✴---Temp---✴ */}
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
      <OverlayModal
        isOpen={isQrOpen}
        setIsOpen={setIsQrOpen}
        body={
          <>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="md:bg-[#111111] rounded-lg"
                initial={{ scale: 1 }}
              >
                <div
                  className="
                      relative 
                      w-18 h-18
                      rounded-md overflow-hidden
                    "
                >
                  <Image
                    src={logo}
                    alt="Company Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </motion.div>
            </div>
            <QRCode
              value={vcardData}
              size={450}
              className="rounded-3xl border border-white/10 p-2 bg-white p-6 w-full h-auto"
            />
          </>
        }
      />
      <main className="bg-[#0b0b0d] text-white">
        <div className="w-full max-w-7xl mx-auto px-4 lg:px-10 pt-12">
          {/* Desktop | Two Column */}
          <div className="hidden lg:flex gap-[2.3%]">
            {/* Left Sticky ProfileCard */}
            <div className="flex-shrink-0 sticky top-8 self-start rounded-3xl border border-white/10  backdrop-blur-sm">
              <ProfileCard setIsOpen={setIsOpen} />
            </div>

            {/* Right Scrollable Content */}
            <div className="flex-1  rounded-3xl border border-white/10  backdrop-blur-sm">
              <NavigationTab setTabIndex={setTabIndex} tabIndex={tabIndex} />
              {tabIndex == 0 && (
                <>
                  <AboutSection />
                  <HighlightsSection />
                  <PortfolioSection />
                </>
              )}

              {tabIndex == 1 && <ResumeSection />}
              {tabIndex == 3 && <ContactSection setIsQrOpen={setIsQrOpen} />}
              {tabIndex == 2 && <SkillSection />}
              {tabIndex == 4 && <ToolSection />}
            </div>
          </div>

          {/* Mobile | Single Column */}
          <div className="lg:hidden space-y-7">
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
                <ToolSection />
              </IOS26TabMenu>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePageClient;
