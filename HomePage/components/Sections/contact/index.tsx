"use client";

import logo from "@/assets/images/logo.svg";
import { motion } from "framer-motion";
import Image from "next/image";
import { MdCall, MdEmail } from "react-icons/md";
import QRCode from "react-qr-code";
import FormSubmit from "./components/FormSubmit";
type propsTypes = {
  setIsQrOpen?: (value: boolean) => void;
};
const ContactSection = ({ setIsQrOpen }: propsTypes) => {
  // VCARD DATA
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

  const openVCard = () => {
    const blob = new Blob([vcardData], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Mukesh.vcf";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <section className="bg-[#111111] p-5 border-t border-l border-r border-gray-800 rounded-[1.25rem]">
      <h2 className="text-3xl font-bold text-white mb-2">Let’s Connect</h2>
       <div className="w-20 sm:w-24 h-[3px] bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mb-8" />

      {/* MAP */}
      <div className="w-full overflow-hidden rounded-xl border border-gray-700">
        <iframe
          className="w-full h-[300px] md:h-[380px]  grayscale invert"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.4830322446987!2d77.64396701222563!3d12.876631787377708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae14bab90b6b8b%3A0xfdb3a392b6148613!2sThiDiff%20Technologies!5e0!3m2!1sen!2sin!4v1765430359242!5m2!1sen!2sin"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {/* CONTACT DETAILS + QR */}
      <div className="mt-8 w-full md:px-0">
        <div className="flex flex-row md:flex-row justify-between items-center w-full  border border-gray-700 rounded-xl p-5 gap-4">
          {/* LEFT: Contact Details */}
          <div className="flex flex-col gap-5 flex-1 min-w-0">
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-6">
              Contact Details
            </h3>

            {/* Mobile */}
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#202020] border border-gray-700">
                <MdCall
                  className="text-lg sm:text-xl"
                  style={{ color: "hsl(190,82%,72%)" }}
                />
              </div>
              <div className="truncate">
                <p className="text-xs sm:text-sm text-gray-400">Mobile</p>
                <a
                  href="tel:+919709083123"
                  className="text-sm sm:text-white font-medium cursor-pointer hover:text-blue-400"
                >
                  +91 97865 87013
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#202020] border border-gray-700">
                <MdEmail
                  className="text-lg sm:text-xl"
                  style={{ color: "hsl(190,82%,72%)" }}
                />
              </div>
              <div className="truncate">
                <p className="text-xs sm:text-sm text-gray-400">Email</p>
                <a
                  href="mailto:contact@themukesh.com?subject=Let's Connect"
                  className="text-sm sm:text-white font-medium cursor-pointer hover:text-blue-400 break-all"
                >
                  contact@themukesh.com
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT: QR Code */}

          <div className="flex-shrink-0">
            <motion.div
              className="relative w-[60px] sm:w-[90px] md:w-[150px]"
              initial={{ scale: 1, opacity: 0.9 }}
              whileHover={{
                scale: 1.12,
                opacity: 1,
                transition: {
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1], // super smooth (apple spring-ish)
                },
              }}
              onClick={() => {
                setIsQrOpen?.(true);
              }}
            >
              {/* QR code → only desktop */}
              <div className="hidden md:block">
                <motion.div
                  initial={{ opacity: 0.6 }}
                  whileHover={{
                    opacity: 1,
                    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                  }}
                >
                  <QRCode
                    value={vcardData}
                    size={180}
                    className="
                        rounded-lg border border-gray-600 p-2 bg-white 
                        w-full h-auto
                      "
                  />
                </motion.div>
              </div>

              {/* Logo overlay → mobile/tablet/desktop */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="md:bg-[#111111] rounded-lg"
                  initial={{ scale: 1 }}
                >
                  <div
                    className="
                      relative 
                      w-25 h-25
                      sm:w-24 sm:h-24
                      md:w-9 md:h-9
                      rounded-md overflow-hidden
                    "
                  >
                    <Image
                      src={logo}
                      alt="Company Logo"
                      fill
                      className="object-contain"
                      priority
                      onClick={() => openVCard()}
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CONTACT FORM */}
      <FormSubmit />
    </section>
  );
};

export default ContactSection;
