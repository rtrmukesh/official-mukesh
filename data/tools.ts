import { MdPassword, MdGridOn, MdPublic, MdPhotoCamera, MdImage } from "react-icons/md";
import { BiBook } from "react-icons/bi";

export const tools = [
  {
    title: "Instagram Downloader",
    description:
      "Fast and easy way to download Instagram Reels, Stories, and Posts in high quality. No login required.",
    url: "/tools/instagram-downloader",
    icon: MdPhotoCamera,
    gradient: "from-pink-500 to-orange-400",
  },
  {
    title: "Pinterest Downloader",
    description:
      "Instantly download Pinterest Videos and Images in high quality for free. Fast, secure, and no login required.",
    url: "/tools/pinterest-downloader",
    icon: MdImage,
    gradient: "from-red-500 to-pink-500",
  },
  {
    title: "AI Image Background Remover",
    description:
      "Instantly remove backgrounds from your images for free using our client-side AI tool. Processing is 100% private.",
    url: "/tools/image-bg-remover",
    icon: MdImage,
    gradient: "from-purple-400 to-indigo-500",
  },
  {
    title: "Free Online Book Library",
    description:
      "Explore a massive online library with 77,786+ books across multiple categories. Read, search, and access books instantly from anywhere.",
    url: "https://books.themukesh.com/",
    icon: BiBook,
    gradient: "from-orange-400 to-red-500",
  },
  {
    title: "Password Generator",
    description:
      "Create strong, secure passwords with custom length and character rules.",
    url: "/tools/password-generator",
    icon: MdPassword,
    gradient: "from-green-400 to-emerald-500",
  },
  {
    title: "Grid Generator",
    description:
      "Generate responsive CSS grid layouts visually for modern web designs.",
    url: "/tools/grid-generator",
    icon: MdGridOn,
    gradient: "from-blue-400 to-indigo-500",
  },
  {
    title: "World Gallery",
    description:
      "Discover a curated collection of stunning global photography and cultural stories.",
    url: "https://photos.themukesh.com/",
    icon: MdPublic,
    gradient: "from-pink-400 to-purple-500",
  },
];
