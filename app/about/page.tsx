import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me",
  description:
    "Learn more about Mukesh Murugaiyan, a Full Stack Developer specializing in web, mobile, and backend technologies.",
};

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <section className="bg-[#111111] p-5 border-t border-l border-r border-gray-800 rounded-[1.25rem]">
        <h1 className="text-3xl font-bold mb-6">About Me</h1>

        <p className="mb-4">
          Hello, I’m <strong>Mukesh Murugaiyan</strong>, a Full Stack Developer
          with experience in building modern web, mobile, and backend
          applications. I specialize in creating scalable, secure, and
          performance-optimized solutions using the latest technologies.
        </p>

        <p className="mb-4">
          Over the years, I’ve worked on multiple projects involving React,
          Next.js, React Native, Node.js, Firebase, and cloud-based services. My
          focus is always on clean architecture, maintainable code, and
          excellent user experience.
        </p>

        <p className="mb-4">
          This website serves as my personal portfolio where I showcase my
          skills, projects, tools, and experiments. I also use this platform to
          test and publish small utilities and developer-focused tools.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">What I Do</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>Web application development</li>
          <li>Mobile app development (Android & iOS)</li>
          <li>Backend APIs & system design</li>
          <li>Performance optimization & SEO</li>
          <li>Developer tools & automation</li>
        </ul>

        <p className="mt-6">
          If you’d like to collaborate or get in touch, feel free to visit the{" "}
          <a href="/contact" className="text-blue-600 underline">
            Contact
          </a>{" "}
          page.
        </p>
      </section>
    </main>
  );
}
