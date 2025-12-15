"use client";

import { useState } from "react";
import {
    MdDesktopWindows,
    MdPhoneIphone,
    MdStorage,
    MdWeb
} from "react-icons/md";
import SkillCard from "./components/SkillCard";

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
    tech: "Node.js · NestJS · Next.js · Express · Python · JWT · REST · WebSockets · AWS",
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
    subtitle: "CI/CD, Scalable Infrastructure & Cloud Intelligence",
    icon: <MdStorage className="text-2xl text-yellow-400" />,
    tech: "Docker · GitHub Actions · AWS (EC2, S3, Lambda, Rekognition, Textract, SES) · Terraform · Kubernetes",
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
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section className="bg-[#1e1e1f] p-6 rounded-[1.25rem] border border-gray-800">
      <h2 className="text-3xl font-bold text-white mb-2">Skills & Expertise</h2>
      <div className="w-24 h-[3px] bg-cyan-400 rounded-full mb-10" />

      <div className="grid md:grid-cols-2 gap-6">
        {skills.map((skill, i) => (
          <SkillCard
            key={i}
            skill={skill}
            index={i}
            openIndex={openIndex}
            setOpenIndex={setOpenIndex}
          />
        ))}
      </div>
    </section>
  );
}
