"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  MdDesktopWindows,
  MdPhoneIphone,
  MdStorage,
  MdWeb,
} from "react-icons/md";
import SkillTimelineItem from "./components/SkillTimelineItem";

const skills = [
  {
    title: "Mobile Applications",
    subtitle: "iOS & Android",
    icon: <MdPhoneIphone className="text-2xl text-cyan-400" />,
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
    icon: <MdWeb className="text-2xl text-purple-400" />,
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
    icon: <MdDesktopWindows className="text-2xl text-orange-400" />,
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
    icon: <MdStorage className="text-2xl text-green-400" />,
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
    icon: <MdStorage className="text-2xl text-yellow-400" />,
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
    icon: <MdDesktopWindows className="text-2xl text-indigo-400" />,
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
      "Multi-Environment Testing & Debugging",
    ],
  },
];

export default function SkillSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (listRef.current) {
        setHeight(listRef.current.offsetHeight);
      }
    };

    // Initial set
    updateHeight();

    // Update on window resize
    window.addEventListener("resize", updateHeight);

    // Cleanup
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 30%", "end end"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], [0, height]);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#111111] p-4 sm:p-8 rounded-2xl border border-gray-800 max-w-7xl mx-auto"
    >
      <h2 className="text-3xl font-bold text-white mb-2">Expertise</h2>
      <div className="w-20 sm:w-24 h-[3px] bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mb-12" />
      

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-5 sm:left-6 md:left-7 top-0 w-[2px] h-full bg-neutral-700">
          <motion.div
            style={{ height: lineHeight }}
            className="absolute top-0 w-[2px] bg-gradient-to-b from-cyan-400 via-purple-500 to-transparent"
          />
        </div>

        {/* Timeline Items */}
        <div
          ref={listRef}
          className="flex flex-col gap-16 sm:gap-10 pl-16 sm:pl-20 md:pl-24 lg:pl-28"
        >
          {skills.map((skill, index) => (
            <SkillTimelineItem key={index} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
}
