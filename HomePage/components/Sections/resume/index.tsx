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
    // {
    //   type: "item",
    //   title: "Software Development Engineer I",
    //   company: "Amazon Development Centre",
    //   period: "Jul 2018 — Sep 2022",
    //   description:
    //     "Optimized service and fleet data to reduce costs, developed a preregistration system to streamline onboarding, and implemented a two-tier caching architecture to improve reliability. Built a real-time service metrics web app using Java Spring MVC with an intuitive frontend.",
    // },
    // {
    //   type: "item",
    //   title: "SDE Intern",
    //   company: "Amazon Development Centre",
    //   period: "Jan 2018 — Jun 2018",
    //   description:
    //     "Created a web application using Java Spring MVC and an intuitive frontend to analyze service metrics in real-time. Automated the assignment of investigation tasks to engineers by detecting anomalies, enhancing response times.",
    // },
    // EDUCATION
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
    <section className="bg-[#1e1e1f] p-6 border-t border-l border-r border-gray-800 rounded-t-[1.25rem]">
      <h2 className="text-3xl font-bold text-white mb-2">Career Snapshot</h2>
      <div className="w-24 h-[3px] bg-blue-400 rounded-full mb-8" />

      <div className="flex flex-col">
        {timeline.map((item, idx) => {
          if (item.type === "section") {
            return (
              <div key={idx} className="flex items-center gap-3 mt-8 ml-2">
                {item.icon}
                <h3 className="text-xl font-semibold text-white">
                  {item.title}
                </h3>
              </div>
            );
          }

          // ITEM
          return (
            <div key={idx} className="flex relative gap-4 mt-6 ml-8">
              {/* Timeline Line and Dot */}
              <div className="relative flex flex-col items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1"></div>
                {idx !== timeline.length - 1 &&
                  timeline[idx + 1].type === "item" && (
                    <div className="absolute top-3 w-[1px] h-[110.5%] bg-gray-700"></div>
                  )}
              </div>

              {/* Details */}
              <div className="flex-1">
                <h4 className="text-white font-semibold">{item.title}</h4>
                <p className="text-gray-400">{item.company}</p>
                <span className="text-blue-400 text-sm">{item.period}</span>
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
