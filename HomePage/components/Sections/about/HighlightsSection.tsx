import CountUp from "@/components/CountUp";
import { AiOutlineStar } from "react-icons/ai";

export default function HighlightsSection() {
  return (
    <section
      id="stats"
      className="bg-[#111111] p-6  border-l border-r border-gray-800 shadow-lg"
    >
      <div className="flex items-center gap-2">
        <AiOutlineStar className="text-xl" />
        <h3 className="text-xl font-semibold">Highlights & Successes</h3>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-6 sm:grid-cols-3 text-center">
        <div>
          {/* <p className="text-3xl font-bold">+4</p> */}
          <CountUp value={4} prefix="+" className="text-3xl font-bold" />
          <span className="text-xs text-gray-400 block">
            YEARS OF EXPERIENCE
          </span>
        </div>

        <div>
          <CountUp value={0} prefix="+" className="text-3xl font-bold" />
          <span className="text-xs text-gray-400 block">
            PROJECTS COMPLETED
          </span>
        </div>

        {/* <div>
          <p className="text-3xl font-bold">+0</p>
          <span className="text-xs text-gray-400 block">CERTIFICATIONS</span>
        </div> */}
        <div>
          <CountUp value={5} prefix="+" className="text-3xl font-bold" />
          <span className="text-xs text-gray-400 block">
            PROJECTS INPROGRESS
          </span>
        </div>
      </div>
    </section>
  );
}
