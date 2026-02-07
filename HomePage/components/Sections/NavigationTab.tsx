"use client";

interface NavigationTabProps {
  activeSection: string;
}

const NavigationTab: React.FC<NavigationTabProps> = ({ activeSection }) => {
  const menuItems = [
    { label: "About", id: "about" },
    { label: "Resume", id: "resume" },
    { label: "Expertise", id: "skills" },
    { label: "Contact", id: "contact" },
    { label: "Tools", id: "tools" },
  ];

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; // Offset for sticky header
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ✴---Desktop and web---✴ */}
      <div
        className="
        absolute top-0 right-0
        flex items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8     
      px-4 h-8 
      sm:px-6 sm:h-10 
      md:px-8 md:h-12 
      lg:px-10 lg:h-14
        text-xs 
        sm:text-sm 
        md:text-base 
        lg:text-lg font-medium
        rounded-tr-[1.25rem] rounded-bl-[1.25rem]
        bg-gradient-to-r from-[hsl(190,82%,20%)] to-black
        border border-[hsl(190,82%,72%)]
        text-[hsl(190,82%,72%)]
        duration-300 cursor-pointer
        hidden sm:flex
        z-[1]
           "
      >
        <span className="hidden sm:flex items-center gap-3">
          {menuItems.map((item) => (
            <span
              key={item.id}
              className={`${
                activeSection === item.id ? "text-white" : ""
              } cursor-pointer hover:text-white transition-colors`}
              onClick={() => handleScrollTo(item.id)}
            >
              {item.label}
            </span>
          ))}
        </span>
      </div>
    </>
  );
};
export default NavigationTab;
