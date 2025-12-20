"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaLinkedin,
  FaInstagram,
  FaFacebookF,
  FaGithub,
  FaChevronDown,
} from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
import ProfileImage from "@/components/ProfileImage";
import { Courgette } from "next/font/google";
import NeonSign from "@/components/NeonSign";
const courgette = Courgette({
  weight: "400",        // Only "400" is available for Courgette
  subsets: ["latin"],   // Subsets you need
  display: "swap",      // Optional
  variable: "--font-courgette", // Optional CSS variable
});
export default function ProfileCard({
  isMobile = false,
  setIsOpen,
}: {
  isMobile?: boolean;
  setIsOpen?: (value: boolean) => void;
}) {
  const [showContacts, setShowContacts] = useState(false);

  const profileData = {
    email: "contact@themukesh.com",
    linkedin: "www.linkedin.com/in/mukesh-murugaiyan",
    instagram: "https://www.instagram.com/rtr_mukesh_/",
    facebook: "https://www.facebook.com/share/17Z3SPtSSt/?mibextid=wwXIfr",
    github: "https://github.com/rtrmukesh",
  };

  const onSocialClick = (clickedSocial: keyof typeof profileData) => {
    const link = profileData[clickedSocial];

    if (!link) return;
    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="relative w-full">
      {/* MAIN CARD */}
      <div
        className={`
        bg-[#1e1e1f] text-white
        p-6 lg:p-8
        ${
          isMobile && !showContacts
            ? "rounded-2xl lg:rounded-3xl border-b"
            : "rounded-t-2xl lg:rounded-t-3xl"
        }
        border-t border-l border-r border-gray-800
        flex gap-5 lg:gap-8
        flex-row lg:flex-col
        items-center
        transition-all duration-700
        w-full lg:w-[236px]
      `}
      >
        {/* Toggle button → Mobile Only */}
        <button
          onClick={() => setShowContacts(!showContacts)}
          className="
          absolute top-0 right-0
          w-14 h-7 sm:w-24 sm:h-8 lg:w-24 lg:h-8
          flex items-center justify-center 
          text-xs font-medium
          rounded-tr-[1.25rem] rounded-bl-[1.25rem]
          bg-gradient-to-r
          from-[hsl(190,82%,20%)] to-black
          border border-[hsl(190,82%,72%)]
          text-[hsl(190,82%,72%)]
          hover:text-white
          hover:bg-[#0f2c33]
          duration-300
          lg:hidden
          cursor-pointer
  "
        >
          <span className="hidden sm:inline">
            {showContacts ? "Close" : "Contacts"}
          </span>
          <FaChevronDown className="text-[100%]  cursor-pointer duration-200 sm:hidden" />
        </button>

        {/* Profile Image */}
        <ProfileImage show={true} setIsOpen={setIsOpen} />

        {/* Name + Profession */}
        <div className="text-center">
           <NeonSign text="Mukesh" color="blue" />
          <p
            className="
              text-gray-300 text-[10px] sm:text-xs mt-2
              bg-gray-800/60
              inline-block px-3 py-1
              rounded-full border border-gray-700
              backdrop-blur-sm
            "
          >
            Software Developer
          </p>
        </div>
      </div>

      {/* CONTACT PANEL */}
      <AnimatePresence>
        {(showContacts || !isMobile) && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20, borderRadius: 40 }}
            animate={{
              opacity: 1,
              height: "auto",
              y: 0,
              borderRadius: 16,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
            }}
            exit={{
              opacity: 0,
              height: 0,
              y: -20,
              borderRadius: 40,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
            }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 80,
              damping: 18,
            }}
            className={`
              bg-[#1e1e1f]
              border-b border-l border-r border-gray-800
              shadow-2xl
              overflow-hidden
              lg:block lg:w-[236px]
            `}
          >
            <div className="p-6 flex flex-col gap-5">
              <div className="w-full h-[1px] bg-gray-700 rounded-full p-0"></div>

              {/* EMAIL */}
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#202020] border border-gray-700">
                  <MdEmail
                    className="text-lg"
                    style={{ color: "hsl(190, 82%, 72%)" }}
                  />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500">EMAIL</p>
                  <p className="text-xs font-medium break-all">
                    <a
                      href={`mailto:${profileData?.email}?subject=Hello%20Mukesh&body=I%20visited%20your%20portfolio`}
                      className="text-xs font-medium break-all cursor-pointer"
                    >
                      {profileData?.email}
                    </a>
                  </p>
                </div>
              </div>

              {/* LOCATION */}
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#202020] border border-gray-700">
                  <MdLocationOn
                    className="text-lg"
                    style={{ color: "hsl(190, 82%, 72%)" }}
                  />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500">LOCATION</p>
                  <p className="text-xs font-medium">Bangalore, IN</p>
                </div>
              </div>
              <div className="w-full h-[1px] bg-gray-700 rounded-full p-0"></div>
              {/* SOCIAL */}
              <div className="flex justify-start gap-4  text-xl">
                <FaLinkedin
                  className="hover:text-blue-500 duration-200 cursor-pointer"
                  onClick={() => onSocialClick?.("linkedin")}
                />
                <FaInstagram
                  className="hover:text-pink-500 duration-200 cursor-pointer"
                  onClick={() => onSocialClick?.("instagram")}
                />
                <FaFacebookF
                  className="hover:text-blue-400 duration-200 cursor-pointer"
                  onClick={() => onSocialClick?.("facebook")}
                />
                <FaGithub
                  className="hover:text-gray-400 duration-200 cursor-pointer"
                  onClick={() => onSocialClick?.("github")}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
