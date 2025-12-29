import { ColourfulText } from "@/components/animation/ColourfulText";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="bg-[#1e1e1f] p-6 border-t border-l border-r border-gray-800  rounded-t-[1.25rem]"
    >
      <h2 className="text-3xl font-bold mb-2">Digital Identity</h2>
       <div className="w-20 sm:w-24 h-[3px] bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full" />

      <p className="text-gray-300 mt-4 leading-relaxed">
        I&apos;m <ColourfulText text="Mukesh" fontSize={28} glowStrength={24} />
        , a Software Engineer based in Bangalore, India — passionate about
        building scalable Web and Mobile applications (iOS & Android) using
        modern technologies to solve real-world problems.
      </p>

      <p className="text-gray-300 mt-4 leading-relaxed">
        I hold a postgraduate degree from the Dharmapuram Adhinam Arts and
        Science College, Mayiladuthurai, and have worked as a Software
        Development Engineer since 2022.
      </p>
    </section>
  );
}
