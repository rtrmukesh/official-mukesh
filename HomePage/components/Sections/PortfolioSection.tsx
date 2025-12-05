export default function PortfolioSection() {
  return (
    <section
      id="portfolio"
      className="bg-[#1e1e1f] p-6 rounded-b-2xl border-b border-l border-r border-gray-800 shadow-lg"
    >
      <h3 className="text-xl font-semibold">Featured Portfolios</h3>
      <p className="text-gray-400 mt-1 text-sm">
        A glimpse into my professional journey.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
        <div className="h-40 bg-[#0d0d0e] rounded-xl border border-[#1e1f21]"></div>
        <div className="h-40 bg-[#0d0d0e] rounded-xl border border-[#1e1f21]"></div>
      </div>
    </section>
  );
}
