"use client";
import { MdWork, MdSchool } from "react-icons/md";

const ResumeSection = () => {
  const timeline = [
    {
      type: "section",
      title: "Experience",
      icon: (
        <div className="p-1.5 rounded-md bg-[#202020] border border-gray-700">
          <MdWork
            className="text-base"
            style={{ color: "hsl(190, 82%, 72%)" }}
          />
        </div>
      ),
    },
    {
      type: "item",
      title: "Full Stack Developer",
      company: "ThiDiff Technologies",
      period: "Jul 2022 — Present",
      description:
        "Designed and developed high-quality web, Android, iOS, and desktop applications. Delivered user-friendly interfaces, seamless performance, and cross-platform functionality. Collaborated with teams to ensure timely project delivery and maintain professional coding standards.",
    },
    {
      type: "section",
      title: "Education",
      icon: (
        <div className="p-1.5 rounded-md bg-[#202020] border border-gray-700">
          <MdSchool
            className="text-base"
            style={{ color: "hsl(190, 82%, 72%)" }}
          />
        </div>
      ),
    },
    {
      type: "item",
      title: "GreenApple Computer Education",
      company: "Software Training Institute, Mayiladuthurai, Tamil Nadu",
      period: "Mar 2022 — Jun 2022",
      description:
        "Completed a professional training program in C and C++, gaining hands-on experience in programming concepts, data structures, and problem-solving skills.",
    },
    {
      type: "item",
      title: "B.Sc. (Information Technology)",
      company: " Dharmapuram Adhinam Arts and Science College, Mayiladuthurai",
      period: "July 2019 — June 2022",
      description:
        "Built a strong foundation in programming, databases, and web technologies through hands-on projects.",
    },
  ];

  return (
    <section className="bg-[#1e1e1f] p-6 border-t border-l border-r border-gray-800 rounded-[1.25rem]">
      <h2 className="text-3xl font-bold text-white mb-2">Career Snapshot</h2>
      <div className="w-20 sm:w-24 h-[3px] bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full" />

      <div className="flex flex-col">
        {timeline.map((item, idx) => {
          if (item.type === "section") {
            return (
              <div key={idx} className="flex relative gap-4 ml-2 mt-8">
                <div className="relative flex flex-col items-center">
                  {item.icon}
                  <div className="absolute top-[91%] w-[1px] h-[90%] bg-gray-700"></div>
                </div>

                <h3 className="text-xl font-semibold text-white pt-1">
                  {item.title}
                </h3>
              </div>
            );
          }

          // ITEM
          return (
            <div key={idx} className="flex relative gap-4 mt-6 ml-5">
              {/* Timeline Line and Dot */}
              <div className="relative flex flex-col items-center">
                <div
                  className="
                      relative 
                      w-1.5 h-1.5 
                      rounded-full 
                      bg-blue-400
                      shadow-[0_0_8px_rgba(96,165,250,0.9)]
                    "
                ></div>
                {idx !== timeline.length - 1 && (
                  <div className="absolute top-[6px] w-[1px] h-[116.5%] bg-gray-700"></div>
                )}
              </div>

              {/* Details */}
              <div className="flex-1">
                <h4 className="text-white font-semibold">{item.title}</h4>
                <p className="text-gray-400">{item.company}</p>
                <span className="text-sm text-[#52b3c7]">{item.period}</span>
                <p className="text-gray-400 mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ResumeSection;
