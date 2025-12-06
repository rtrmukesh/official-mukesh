"use client";
interface NavigationTabProps {
  setTabIndex: (index: number) => void;
  tabIndex: number;
}
const NavigationTab: React.FC<NavigationTabProps> = ({
  setTabIndex,
  tabIndex,
}) => {
  const menuItems = ["About", "Resume", "Portfolio", "Contact", "Gallery"];
  return (
    <>
      {/* ✴---Desktop and web---✴ */}
      <button
        className="
        absolute top-0 right-0
        flex items-center gap-3     
        px-4 h-8 sm:px-6 sm:h-9
        text-xs font-medium
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
          {menuItems.map((item, index) => (
            <span
              key={index}
              className={`${
                tabIndex == index ? "text-white" : ""
              } cursor-pointer hover:text-white`}
              onClick={() => {
                setTabIndex(index);
              }}
            >
              {item}
            </span>
          ))}
        </span>
      </button>

      {/* ✴---Mobile Only---✴ */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full  backdrop-blur-md  z-50 sm:hidden">
        <div className="flex justify-center items-center h-16 px-2">
          <button
            className="
            text-xs font-medium
            bg-gradient-to-r from-[hsl(190,82%,20%)] to-black
            border border-[hsl(190,82%,72%)]
            text-[hsl(190,82%,72%)]
            px-4 py-2
            duration-300
            hover:text-white
            transition-colors
             rounded-[1.25rem]
            flex gap-3
            items-center justify-center
          "
          >
            {menuItems.map((item, index) => (
              <span
                key={index}
                onClick={() => {
                  setTabIndex(index);
                }}
                className={`${tabIndex == index ? "text-white" : ""}`}
              >
                {item}
              </span>
            ))}
          </button>
        </div>
      </div>
    </>
  );
};
export default NavigationTab;
