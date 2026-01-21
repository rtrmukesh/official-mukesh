import { ColourfulText } from "@/components/animation/ColourfulText";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="bg-[#111111] p-6 border-t border-l border-r border-white/10  rounded-t-[1.25rem]"
    >
      {/* Heading */}
      <h2 className="text-3xl font-bold mb-2">About Me</h2>
      <div className="w-24 h-[3px] bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mb-6" />

      {/* Intro */}
      <p className="text-gray-300 leading-relaxed">
        I&apos;m <ColourfulText text="Mukesh" fontSize={28} glowStrength={24} />
        , a passionate Software Engineer based in Bangalore, India. I specialize
        in building scalable, secure, and performance-driven Web and Mobile
        applications for real-world use cases.
      </p>

      <p className="text-gray-300 mt-4 leading-relaxed">
        I hold a postgraduate degree from Dharmapuram Adhinam Arts and Science
        College, Mayiladuthurai, and I have been working professionally as a
        Software Development Engineer since 2022.
      </p>

      {/* Website Purpose */}
      <h3 className="text-xl font-semibold mt-8 mb-2">
        Purpose of This Website
      </h3>

      <p className="text-gray-300 leading-relaxed">
        This website is my personal portfolio and technical platform where I
        share my professional experience, projects, and practical tools. The
        goal of this site is to provide meaningful, original, and useful content
        for developers, recruiters, and technology enthusiasts.
      </p>

      {/* What Users Get */}
      <h3 className="text-xl font-semibold mt-8 mb-2">
        What You&apos;ll Find Here
      </h3>

      <p className="text-gray-300 leading-relaxed">
        Visitors can explore my skillset, review my real-world projects, and use
        various web-based tools designed to simplify everyday development tasks.
        All content published here is carefully built with a focus on clarity,
        usability, and long-term value.
      </p>

      {/* Skills */}
      <h3 className="text-xl font-semibold mt-8 mb-2">Technical Expertise</h3>

      <p className="text-gray-300 leading-relaxed">
        My primary expertise includes React, Next.js, Node.js, React Native,
        Firebase, REST APIs, and modern backend architectures. I focus on clean
        code, optimized performance, and secure implementations across both web
        and mobile platforms.
      </p>

      {/* Trust / Quality */}
      <h3 className="text-xl font-semibold mt-8 mb-2">Commitment to Quality</h3>

      <p className="text-gray-300 leading-relaxed">
        I strongly believe in best development practices, continuous learning,
        and ethical software engineering. Every feature, tool, or project shared
        on this site is built from scratch, tested thoroughly, and maintained to
        ensure accuracy and reliability.
      </p>

      {/* Future Vision */}
      <h3 className="text-xl font-semibold mt-8 mb-2">Future Vision</h3>

      <p className="text-gray-300 leading-relaxed">
        This platform will continue to grow with more advanced tools, technical
        articles, and open-source contributions aimed at helping developers
        learn faster and build better software solutions.
      </p>

      <h3 className="text-xl font-semibold mt-8 mb-2">
        Core Skills & Technologies
      </h3>

      <p className="text-gray-300 leading-relaxed">
        Over the years, I have worked extensively with a wide range of
        technologies across frontend, backend, and mobile development. My skill
        set is focused on building production-ready applications with
        scalability, security, and performance in mind.
      </p>

      <ul className="list-disc list-inside mt-4 space-y-2 text-gray-300">
        <li>
          <strong>Frontend:</strong> React.js · Next.js · TypeScript · Tailwind
          CSS · HTML5 · CSS3
        </li>
        <li>
          <strong>Backend & APIs:</strong> Node.js · NestJS · Next.js · Java ·
          Python · JWT · REST · WebSockets · AWS
        </li>
        <li>
          <strong>Mobile:</strong> Expo · React Native (Android & iOS) ·
          Cross-Platform · Kotlin · Swift · Firebase
        </li>
        <li>
          <strong>Desktop:</strong> Electron · React · Node.js · Python ·
          WebSockets · Vite
        </li>
        <li>
          <strong>Databases:</strong> Firebase Firestore · MongoDB · SQL · PSQL
        </li>
      </ul>
    </section>
  );
}
