export default function Testimonials() {
  const reviews = [
    {
      name: "Aisha",
      rating: 5,
      comment: "Amazing quality 💎 Looks premium and elegant!",
    },
    {
      name: "Rahul",
      rating: 4,
      comment: "Good product. Delivery was fast. Worth the price.",
    },
    {
      name: "Neha",
      rating: 5,
      comment: "Loved the design. Perfect gift 🎁 Highly recommended!",
    },
    {
      name: "Sara",
      rating: 5,
      comment: "The finishing is so classy. RUMEA feels luxurious!",
    },
  ];

  return (
    <section className="bg-white py-14">
      <div className="max-w-7xl mx-auto px-6">
        {/* ✅ Section Header */}
        <div className="text-center mb-16 animate-fadeUp">
          <h2 className="text-4xl md:text-5xl font-luxury text-mocha">
            Testimonials
          </h2>
          <p className="mt-4 text-mocha/70 text-base md:text-lg">
            What our customers say about RUMEA
          </p>
        </div>

        {/* ✅ Cards */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="fade-card bg-ivory border border-antiqueGold/30 rounded-3xl shadow-md p-7 transition duration-300 hover:-translate-y-2 hover:shadow-lg"
              style={{ "--delay": `${i * 0.15}s` }}
            >
              {/* Rating */}
              <p className="text-yellow-600 font-semibold text-lg mb-3">
                {"⭐".repeat(r.rating)}{" "}
                <span className="text-mocha font-bold ml-2">{r.rating}/5</span>
              </p>

              {/* Comment */}
              <p className="text-mocha/80 text-base md:text-lg leading-relaxed">
                “{r.comment}”
              </p>

              {/* Name */}
              <div className="mt-7 flex items-center justify-between">
                <p className="font-semibold text-mocha text-lg">{r.name}</p>

                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-antiqueGold/20 text-mocha">
                  Verified
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Animation CSS */}
      <style>
        {`
          .animate-fadeUp {
            opacity: 0;
            transform: translateY(20px);
            animation: fadeUp 0.7s ease forwards;
          }

          .fade-card {
            opacity: 0;
            transform: translateY(22px);
            animation: fadeUp 0.8s ease forwards;
            animation-delay: var(--delay);
          }

          @keyframes fadeUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </section>
  );
}
