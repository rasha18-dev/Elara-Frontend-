export default function FeaturedProducts() {
  return (
    <section className="bg-ivory py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* SECTION HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-luxury text-mocha">
            Featured Products
          </h2>
          <p className="mt-3 text-mocha/70 text-sm md:text-base">
            Handpicked designs loved by our customers
          </p>
        </div>

        {/* PRODUCT GRID */}
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">

          {/* PRODUCT 1 */}
          <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-6 shadow-md hover:shadow-xl transition">
            <img
              src="/weddingring.jpg"
              alt="Gold Ring"
              className="rounded-2xl h-64 w-full object-cover mb-6"
            />
            <h3 className="text-lg font-luxury text-mocha">
            Wedding Ring
            </h3>
            <p className="mt-2 text-sm text-mocha/70">
              Elegant 22K gold ring for everyday wear.
            </p>
            <button className="mt-4 text-sm text-softGold hover:underline">
              View Details →
            </button>
          </div>

          {/* PRODUCT 2 */}
          <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-6 shadow-md hover:shadow-xl transition">
            <img
              src="/neklaceset.jpg"
              alt="Diamond Necklace"
              className="rounded-2xl h-64 w-full object-cover mb-6"
            />
            <h3 className="text-lg font-luxury text-mocha">
              Diamond Necklace
            </h3>
            <p className="mt-2 text-sm text-mocha/70">
              Sparkling diamonds crafted with perfection.
            </p>
            <button className="mt-4 text-sm text-softGold hover:underline">
              View Details →
            </button>
          </div>

          {/* PRODUCT 3 */}
          <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-6 shadow-md hover:shadow-xl transition">
            <img
              src="/pearl.jpg"
              alt="Gold Earrings"
              className="rounded-2xl h-64 w-full object-cover mb-6"
            />
            <h3 className="text-lg font-luxury text-mocha">
              Elegant Earrings
            </h3>
            <p className="mt-2 text-sm text-mocha/70">
              Graceful gold earrings for special occasions.
            </p>
            <button className="mt-4 text-sm text-softGold hover:underline">
              View Details →
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
