"use client";
import { MENUS } from "./NavMenuData";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function DesktopNav() {
  const [active, setActive] = useState<number | null>(null);

  const router = useRouter();

  const handleNavigate = (route: string) => {
    router.push(route);
  };

  return (
    <div className="hidden md:flex gap-8 items-center">
      {MENUS.map((menu, index) => (
        <div
          key={menu.title}
          className="relative"
          onMouseEnter={() => setActive(index)}
          onMouseLeave={() => setActive(null)}
        >
          <button className="dark:text-white text-gray-800 hover:text-blue-600 font-medium transition">
            {menu.title}
          </button>

          {active === index && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute top-full bg-white dark:bg-neutral-900 shadow-lg p-4 rounded-lg min-w-[200px]"
            >
              {menu.items.map((item) => (
                <p
                  key={item?.name}
                  className="py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 cursor-pointer"
                  onClick={() => handleNavigate(item?.route)}
                >
                  {item?.name}
                </p>
              ))}
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
}
