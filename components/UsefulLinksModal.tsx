"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { X, ExternalLink, ChevronRight, Sparkles, Clock, Users, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LinkItem {
  title: string;
  href: string;
  description: string;
  icon: React.ReactNode;
  badge?: string;
}

export default function UsefulLinksModal() {
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Check if user has already seen/dismissed the modal
  useEffect(() => {
      timerRef.current = setTimeout(() => {
        setOpen(true);
        setTimeout(() => setIsVisible(true), 50); // Small delay for animation
      }, 10000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      setOpen(false);
    }, 300);
  }, []);

  const handleLinkClick = useCallback((href: string) => {
    handleClose();
    // You could add analytics here
    console.log("Link clicked:", href);
  }, [handleClose]);

  const usefulLinks: LinkItem[] = [
    {
      title: "Pricing Plans",
      href: "/pricing",
      description: "Flexible plans for teams of all sizes",
      icon: <Users className="w-5 h-5" />,
      badge: "Popular"
    },
    {
      title: "App Features",
      href: "/features",
      description: "Explore powerful features",
      icon: <Zap className="w-5 h-5" />,
    },
    {
      title: "Contact Support",
      href: "/contact",
      description: "24/7 customer support",
      icon: <Sparkles className="w-5 h-5" />,
    },
    {
      title: "Documentation",
      href: "/docs",
      description: "Guides & tutorials",
      icon: <Clock className="w-5 h-5" />,
    },
    {
      title: "Blog & Updates",
      href: "/blog",
      description: "Latest news & insights",
      icon: <ExternalLink className="w-5 h-5" />,
    },
    {
      title: "Community",
      href: "/community",
      description: "Join our community",
      icon: <Users className="w-5 h-5" />,
      badge: "New"
    },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ 
              scale: isVisible ? 1 : 0.9, 
              opacity: isVisible ? 1 : 0, 
              y: isVisible ? 0 : 20 
            }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ 
              duration: 0.4, 
              ease: [0.25, 0.1, 0.25, 1], // Custom cubic bezier for premium feel
              type: "spring",
              stiffness: 300,
              damping: 25
            }}
            className="relative w-full max-w-2xl"
          >
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50">
              {/* Header */}
              <div className="relative p-8 bg-gradient-to-r from-blue-50 via-white to-purple-50 border-b border-gray-200/50">
                <div className="absolute top-6 right-6">
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleClose}
                    className="p-2 rounded-full bg-white/80 hover:bg-white shadow-sm hover:shadow-md transition-all duration-200"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </motion.button>
                </div>
                
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Useful Links
                    </h2>
                    <p className="text-gray-600 text-sm md:text-base mt-1">
                      Quick access to important pages
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {usefulLinks.map((link, index) => (
                    <motion.a
                      key={link.title}
                      href={link.href}
                      onClick={() => handleLinkClick(link.href)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ 
                        opacity: isVisible ? 1 : 0, 
                        x: isVisible ? 0 : -20 
                      }}
                      transition={{ 
                        duration: 0.3, 
                        delay: index * 0.05,
                        ease: "easeOut"
                      }}
                      whileHover={{ 
                        scale: 1.02, 
                        x: 4,
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative bg-white hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-white border border-gray-200/70 rounded-2xl p-5 transition-all duration-200 shadow-sm hover:shadow-lg"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-blue-50 group-hover:bg-blue-100 rounded-xl transition-colors duration-200">
                            <div className="text-blue-600">
                              {link.icon}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-gray-900 truncate">
                                {link.title}
                              </h3>
                              {link.badge && (
                                <span className="px-2 py-0.5 text-xs font-medium bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full">
                                  {link.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 truncate">
                              {link.description}
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transform group-hover:translate-x-1 transition-all duration-200" />
                      </div>
                    </motion.a>
                  ))}
                </div>

                {/* Footer */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isVisible ? 1 : 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-8 pt-6 border-t border-gray-200/50"
                >
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-500 text-center sm:text-left">
                      Need help?{" "}
                      <a 
                        href="/help" 
                        className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                        onClick={() => handleLinkClick("/help")}
                      >
                        Visit our help center
                      </a>
                    </p>
                    <button
                      onClick={handleClose}
                      className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 shadow-sm hover:shadow"
                    >
                      Maybe Later
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Background decorative elements */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-300/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-300/10 rounded-full blur-3xl -z-10" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}