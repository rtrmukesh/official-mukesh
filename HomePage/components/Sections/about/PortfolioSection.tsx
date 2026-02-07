import CardLayout from "@/components/CardLayout";

export default function PortfolioSection({ id }: { id?: string }) {
  return (
    <section
      id={id || "portfolio"}
      className="p-6"
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
