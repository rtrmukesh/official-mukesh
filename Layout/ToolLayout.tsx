import { ReactNode } from "react";
import ProfileCard from "@/HomePage/components/ProfileCard/ProfileCard";

type ToolLayoutProps = {
  children: ReactNode;
};

const ToolLayout = ({ children }: ToolLayoutProps) => {
  return (
    <div className="min-h-screen bg-[#111111] text-white">
      <main className="w-full max-w-7xl mx-auto px-4 lg:px-10 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column - Profile Card */}
          <div className="flex-shrink-0 sticky top-8 self-start h-fit hidden lg:block">
            <div className="lg:w-[236px]">
              <ProfileCard />
            </div>
          </div>

          {/* Mobile Profile Card */}
          <div className="lg:hidden w-full">
            <ProfileCard isMobile={true} />
          </div>

          {/* Right Column - Tool Content */}
          <div className="flex-1 rounded-3xl border border-white/10 backdrop-blur-sm relative bg-[#111111] p-6 lg:p-8 overflow-hidden">
            {children}
          </div>

        </div>
      </main>
    </div>
  );
};

export default ToolLayout;
