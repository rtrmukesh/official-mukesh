"use client";

import {
  MdDesktopWindows,
  MdPhoneIphone,
  MdStorage,
  MdWeb,
} from "react-icons/md";

const SkillSection = ({ id }: { id?: string }) => {
  const skillsData = [
    {
      title: "Mobile Applications",
      subtitle: "iOS & Android",
      icon: (
        <div className="p-1.5 rounded-md bg-[#202020] border border-gray-700">
          <MdPhoneIphone
            className="text-base"
            style={{ color: "hsl(190, 82%, 72%)" }}
          />
        </div>
      ),
      tech: "Expo · React Native · Cross-Platform · Kotlin · Swift · Firebase",
      features: [
        "Real-Time Live Location Tracking",
        "Persistent Background Services",
        "Biometric Authentication (Fingerprint / Face ID)",
        "Secure Encrypted Vault",
        "App Hide / Unhide (Stealth Mode)",
        "Advanced Media Processing",
        "SIM Change Detection & Alerting",
        "Custom App Store–Style Download Experience",
        "Automatic Missed Call Reply System",
        "Call Register Synchronization via FCM",
        "Call Log Synchronization via FCM",
        "End-to-End In-App Calling (Agora SDK)",
        "Optical Character Recognition (OCR)",
        "Text-to-Speech (TTS) Voice Playback",
      ],
    },
    {
      title: "Web Applications",
      subtitle: "Frontend & SEO",
      icon: (
        <div className="p-1.5 rounded-md bg-[#202020] border border-gray-700">
          <MdWeb
            className="text-base"
            style={{ color: "hsl(260, 100%, 75%)" }}
          />
        </div>
      ),
      tech: "React · Next.js · Tailwind",
      features: [
        "SEO Optimized Pages",
        "Admin Dashboards",
        "Authentication Systems",
        "Chrome Extensions",
        "Analytics Tracking",
        "High Performance UI",
      ],
    },
    {
      title: "Desktop Applications",
      subtitle: "Cross-Platform (Slack-Style Apps)",
      icon: (
        <div className="p-1.5 rounded-md bg-[#202020] border border-gray-700">
          <MdDesktopWindows
            className="text-base"
            style={{ color: "hsl(30, 100%, 65%)" }}
          />
        </div>
      ),
      tech: "Electron · React · Node.js · Python · WebSockets · Vite",
      features: [
        "Real-Time Chat (Slack-Style UI)",
        "Multi-Workspace & Channel System",
        "One-to-One & Group Messaging",
        "Typing Indicators & Read Receipts",
        "File & Media Sharing",
        "Voice & Video Call Integration",
        "Desktop Notifications",
        "Offline Message Sync",
        "User Presence (Online / Away)",
        "Message Search & Filters",
        "Role-Based Access Control",
        "Cross-Platform Builds (Windows · macOS · Linux)",
      ],
    },
    {
      title: "Backend & APIs",
      subtitle: "Scalable & Secure Systems",
      icon: (
        <div className="p-1.5 rounded-md bg-[#202020] border border-gray-700">
          <MdStorage
            className="text-base"
            style={{ color: "hsl(140, 70%, 60%)" }}
          />
        </div>
      ),
      tech: "Node.js · NestJS · Next.js · Java · Python · JWT · REST · WebSockets · AWS",
      features: [
        "RESTful API Design",
        "JWT-Based Authentication & Authorization",
        "Role-Based Access Control (RBAC)",
        "Secure API Architecture",
        "Realtime APIs (WebSockets / Socket.IO)",
        "File Upload & Media Processing",
        "Background Jobs & Task Queues",
        "API Rate Limiting & Security Hardening",
        "Microservice-Ready Architecture",
        "Server-Side Rendering APIs (Next.js)",
        "AWS EC2 / S3 / Lambda Deployment",
        "Cloud Scalability & Monitoring",
        "Production-Grade Infrastructure",
      ],
    },
    {
      title: "DevOps, Cloud & AWS AI",
      subtitle: "CI/CD, Cloud Intelligence",
      icon: (
        <div className="p-1.5 rounded-md bg-[#202020] border border-gray-700">
          <MdStorage
            className="text-base"
            style={{ color: "hsl(50, 90%, 60%)" }}
          />
        </div>
      ),
      tech: "Docker · GitHub · AWS (EC2, S3, Lambda, Rekognition, Textract, SES) ",
      features: [
        "Dockerized Application Deployments",
        "CI/CD Pipelines (GitHub Actions / Jenkins)",
        "Infrastructure as Code (Terraform / CloudFormation)",
        "Cloud Monitoring & Logging (AWS CloudWatch, ELK Stack)",
        "Auto-Scaling & Load Balancing",
        "Server Provisioning & Configuration",
        "Cloud Security Best Practices",
        "Multi-Environment Deployment (Dev / Staging / Prod)",
        "Disaster Recovery & Backup Strategies",
        "Microservices & Container Orchestration (Kubernetes)",
        "AWS Rekognition (Face & Object Detection)",
        "AWS Textract (Document Analysis & OCR)",
        "AWS SES (Transactional & Marketing Emails)",
        "Cloud-Based AI/ML Integrations",
      ],
    },
    {
      title: "Operating Systems & Platforms",
      subtitle: "Cross-Platform Expertise",
      icon: (
        <div className="p-1.5 rounded-md bg-[#202020] border border-gray-700">
          <MdDesktopWindows
            className="text-base"
            style={{ color: "hsl(220, 90%, 70%)" }}
          />
        </div>
      ),
      tech: "Windows · macOS · Linux · Android · iOS",
      features: [
        "Cross-Platform Application Development",
        "System-Level Scripting & Automation (Bash, PowerShell)",
        "Performance Optimization & Resource Management",
        "Process & Thread Management",
        "File System Handling & Permissions",
        "Networking & Socket Programming",
        "Mobile OS Integration (iOS, Android)",
        "OS Security & Hardening Practices",
        "Virtual Machines & Containers (VMware, Docker)",
        "Multi-Environment Deployment (Dev / Staging / Prod)",
      ],
    },
  ];

  // Transform skillsData into the timeline format used in ResumeSection
  const timeline = skillsData.flatMap((skill) => [
    {
      type: "section",
      title: skill.title,
      icon: skill.icon,
    },
    {
      type: "item",
      title: skill.subtitle,
      tech: skill.tech,
      features: skill.features,
    },
  ]);

  return (
    <section id={id || "skills"} className="relative p-4 sm:p-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-2">Expertise</h2>
      <div className="w-20 sm:w-24 h-[3px] bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mb-12" />

      <div className="flex flex-col">
        {timeline.map((item, idx) => {
          if (item.type === "section") {
            return (
              <div key={idx} className="flex relative gap-4 ml-2 mt-8">
                <div className="relative flex flex-col items-center">
                  {item.icon}
                  {/* Vertical Line */}
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
                <p className="text-[#52b3c7] text-sm mt-1">{item.tech}</p>
                <ul className="list-disc list-inside text-gray-400 mt-3 space-y-1 text-sm leading-relaxed">
                  {item.features?.map((feature, fIdx) => (
                    <li key={fIdx}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SkillSection;
