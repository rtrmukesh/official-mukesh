"use client";
import logo from "@/assets/images/logo.svg";
import mukesh from "@/assets/images/mukesh-mg.png";
import MotionVariantWrapper from "@/components/MotionVariantWrapper";
import OverlayModal from "@/components/OverlayModal";
import ProfileCard from "@/HomePage/components/ProfileCard/ProfileCard";
import AboutSection from "@/HomePage/components/Sections/about/AboutSection";
import HighlightsSection from "@/HomePage/components/Sections/about/HighlightsSection";
import PortfolioSection from "@/HomePage/components/Sections/about/PortfolioSection";
import ContactSection from "@/HomePage/components/Sections/contact";
import IOS26TabMenu from "@/HomePage/components/Sections/IOS26TabMenu";
import NavigationTab from "@/HomePage/components/Sections/NavigationTab";
import ResumeSection from "@/HomePage/components/Sections/resume";
import SkillSection from "@/HomePage/components/Sections/skills";
import ToolSection from "@/HomePage/components/Sections/Tool";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { useInView } from "react-intersection-observer";

const HomePageClient = () => {
  const [activeSection, setActiveSection] = useState("about");
  const [isOpen, setIsOpen] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);

  // ScrollSpy logic using IntersectionObserver
  // Using rootMargin to trigger when the section enters the middle part of the screen
  const scrollSpyOptions = { 
    threshold: 0.2, 
    rootMargin: "-20% 0px -20% 0px" 
  };
  
  const { ref: aboutRef, inView: aboutInView } = useInView({ ...scrollSpyOptions, threshold: 0.1 }); // About is at top, easier to trigger
  const { ref: resumeRef, inView: resumeInView } = useInView(scrollSpyOptions);
  const { ref: skillsRef, inView: skillsInView } = useInView({ ...scrollSpyOptions, threshold: 0.1 });
  const { ref: contactRef, inView: contactInView } = useInView(scrollSpyOptions);
  const { ref: toolsRef, inView: toolsInView } = useInView(scrollSpyOptions);

  useEffect(() => {
    if (aboutInView) setActiveSection("about");
  }, [aboutInView]);

  useEffect(() => {
    if (resumeInView) setActiveSection("resume");
  }, [resumeInView]);

  useEffect(() => {
    if (skillsInView) setActiveSection("skills");
  }, [skillsInView]);

  useEffect(() => {
    if (contactInView) setActiveSection("contact");
  }, [contactInView]);

  useEffect(() => {
    if (toolsInView) setActiveSection("tools");
  }, [toolsInView]);

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
      <main className="text-white">
        <div className="w-full max-w-7xl mx-auto px-4 lg:px-10 pt-12">
          {/* Desktop | Two Column */}
          <div className="hidden lg:flex gap-[2.3%]">
            {/* Left Sticky ProfileCard */}
            <div className="flex-shrink-0 sticky top-8 self-start rounded-3xl border border-white/10  backdrop-blur-sm h-fit">
              <ProfileCard setIsOpen={setIsOpen} />
            </div>

            {/* Right Scrollable Content */}
            <div className="flex-1 rounded-3xl border border-white/10 backdrop-blur-sm relative bg-[#111111]">
              <NavigationTab activeSection={activeSection} />

              
              <div className="flex flex-col">
                <div ref={aboutRef}>
                   <MotionVariantWrapper variant="fadeUp" id="about-wrapper">
                    <AboutSection />
                  </MotionVariantWrapper>
                  <MotionVariantWrapper variant="zoomIn" delay={0.2}>
                    <HighlightsSection />
                  </MotionVariantWrapper>
                  <MotionVariantWrapper variant="slideRight" delay={0.3}>
                    <PortfolioSection />
                  </MotionVariantWrapper>
                </div>

                <div ref={resumeRef}>
                  <MotionVariantWrapper variant="fadeUp" delay={0.1}>
                    <ResumeSection />
                  </MotionVariantWrapper>
                </div>

                <div ref={skillsRef}>
                  <MotionVariantWrapper variant="slideLeft" delay={0.1}>
                    <SkillSection />
                  </MotionVariantWrapper>
                </div>

                <div ref={contactRef}>
                  <MotionVariantWrapper variant="rotateIn" delay={0.1}>
                    <ContactSection setIsQrOpen={setIsQrOpen} />
                  </MotionVariantWrapper>
                </div>

                <div ref={toolsRef}>
                  <MotionVariantWrapper variant="fadeUp" delay={0.1}>
                    <ToolSection />
                  </MotionVariantWrapper>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile | Single Column */}
          <div className="lg:hidden space-y-7">
            <ProfileCard isMobile={true} setIsOpen={setIsOpen} />
            <div className="relative bg-[#111111] rounded-3xl border border-white/10 backdrop-blur-sm">
               {/* Mobile Content - Rendered Directy */}
                <div ref={aboutRef}>
                  <MotionVariantWrapper variant="fadeUp">
                    <AboutSection id="about-mobile" />
                  </MotionVariantWrapper>
                  <MotionVariantWrapper variant="zoomIn" delay={0.1}>
                    <HighlightsSection id="highlights-mobile" />
                  </MotionVariantWrapper>
                  <MotionVariantWrapper variant="slideRight" delay={0.1}>
                    <PortfolioSection id="portfolio-mobile" />
                  </MotionVariantWrapper>
                </div>

                <div ref={resumeRef}>
                  <MotionVariantWrapper variant="fadeUp">
                    <ResumeSection id="resume-mobile" />
                  </MotionVariantWrapper>
                </div>

                <div ref={skillsRef}>
                  <MotionVariantWrapper variant="slideLeft">
                    <SkillSection id="skills-mobile" />
                  </MotionVariantWrapper>
                </div>

                 <div ref={contactRef}>
                  <MotionVariantWrapper variant="rotateIn">
                    <ContactSection setIsQrOpen={setIsQrOpen} id="contact-mobile" />
                  </MotionVariantWrapper>
                 </div>

                 <div ref={toolsRef}>
                  <MotionVariantWrapper variant="fadeUp">
                    <ToolSection id="tools-mobile" />
                  </MotionVariantWrapper>
                 </div>
            </div>
            
             <IOS26TabMenu activeSection={activeSection} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePageClient;
