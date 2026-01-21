import CardLayout from "@/components/CardLayout";

export default function PortfolioSection() {
  return (
    <section
      id="portfolio"
      className="bg-[#111111] p-6 rounded-b-2xl border-b border-l border-r border-white/10 shadow-lg"
    >
      <h3 className="text-xl font-semibold">Featured Projects</h3>
      <p className="text-gray-400 mt-1 text-sm">
        A glimpse into my professional journey.
      </p>

      <div className="grid grid-cols-1  gap-6 mt-6">
        <CardLayout />
      </div>
    </section>
  );
}
