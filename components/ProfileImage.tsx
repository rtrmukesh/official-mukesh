import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import mukesh from "@/assets/images/mukesh-mg2.png";

const ProfileImage = ({ show, setIsOpen }: { show: boolean, setIsOpen?: (value: boolean) => void }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="w-20 h-20 sm:w-35 sm:h-35 lg:w-37 lg:h-38 rounded-xl border border-gray-600 overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <motion.div
            className="w-full h-full"
            initial={{ scale: 1.0 }}
            whileHover={{ scale: 1.2 }} 
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Image
              src={mukesh}
              alt="Mukesh M"
              width={200}
              height={200}
              className="object-cover w-full h-full"
              loading="lazy"
              priority={false}
              onClick={()=>{
                setIsOpen?.(true)
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProfileImage;
