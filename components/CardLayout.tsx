"use client";

export const portfolioCards = [
  {
    id: 1,
    title: "Nexreon",
    description:
      "Explore the breathtaking heights of natural wonders. These majestic mountains offer spectacular views.",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
    type: "main",
    className: "card rounded-2xl h-[300px] w-full top-0 left-0",
    status: "Running",
  },
  {
    id: 2,
    title: "Torchlite",
    description:
      "Experience the serene beauty of this peaceful lake destination.",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
    type: "left",
    className:
      "card rounded-2xl h-[197px] w-[430px] top-[305px] left-0 bottom-0",
    status: "Running",
  },
  {
    id: 3,
    title: "Motion Sports",
    description: "Discover the mysteries hidden within ancient forests.",
    image:
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80",
    type: "right",
    className:
      "card-d3 rounded-2xl border-4 border-white h-[310px] w-[450px] right-0 bottom-0",
    status: "Running",
  },
];

export default function CardLayout() {
  return (
    <div className="flex items-center justify-center">
      <div className="card-container  shadow-lg">
        {portfolioCards.map((data) => {
          return (
            <div
              key={data?.type}
              className={data?.className}
              style={{
                backgroundImage: `url(${data?.image})`,
              }}
            >
              <div className="card-content">
                {/* Title */}
                <div className="card-title flex items-center justify-between">
                  <span>{data?.title}</span>

                  {/* Running Status */}
                  <span
                    className={`card-description flex items-center gap-2 text-sm font-semibold ${
                      data?.status === "Running"
                        ? "text-green-500"
                        : "text-gray-400"
                    }`}
                  >
                    <span
                      className={`w-3 h-3 rounded-full inline-block ${
                        data?.status === "Running"
                          ? "bg-green-500"
                          : "bg-gray-400"
                      }`}
                    ></span>
                    {data?.status}
                  </span>
                </div>

                {/* Description */}
                <div className="card-description mt-1">{data?.description}</div>

                {/* View Features button */}
                <button className="cursor-pointer card-description mt-3 px-3 py-1 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-200 transition">
                  View Features
                </button>
              </div>
            </div>
          );
        })}

        {/* Styles */}
        <style jsx>{`
          /* ================= DESKTOP (UNCHANGED) ================= */
          .card-container {
            position: relative;
            height: 505px;
            width: 100vw;
            overflow: hidden;
            border-radius: 16px;
          }

          .card,
          .card-d3 {
            position: absolute;
            transition: all 0.5s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            z-index: 1;
            background-size: cover;
            background-position: center;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }

          .card:hover {
            height: 505px !important;
            width: 100% !important;
            top: 0 !important;
            left: 0 !important;
            z-index: 10;
          }

          .card-d3:hover {
            height: 505px !important;
            width: 100% !important;
            right: 0 !important;
            bottom: 0 !important;
            z-index: 10;
            border: none;
          }

          .card-content {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 1.5rem;
            background: linear-gradient(
              to top,
              rgba(0, 0, 0, 0.8),
              transparent
            );
          }

          .card-title {
            font-size: 1.25rem;
            margin-bottom: 0.5rem;
          }

          .card-description {
            font-size: 0.875rem;
            opacity: 0;
            max-height: 0;
            transition: all 0.3s ease;
          }

          .card:hover .card-description,
          .card-d3:hover .card-description {
            opacity: 1;
            max-height: 100px;
          }

          /* ================= TABLET ================= */
          @media (max-width: 1024px) {
            .card-container {
              width: 100%;
            }

            .card {
              width: 100% !important;
            }

            .card-d3 {
              width: 58vw !important;
            }
          }

          /* ================= MOBILE ================= */
          @media (max-width: 768px) {
            .card-container {
              height: auto;
              width: 100%;
              display: flex;
              flex-direction: column;
              gap: 16px;
            }

            .card,
            .card-d3 {
              position: relative !important;
              width: 100% !important;
              height: 220px !important;
              top: auto !important;
              left: auto !important;
              right: auto !important;
              bottom: auto !important;
              border: none;
            }

            .card:hover,
            .card-d3:hover {
              height: 260px !important;
              width: 100% !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
