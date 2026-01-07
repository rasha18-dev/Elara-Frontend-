export default function Customization() {
  return (
    <section className="bg-champagne py-24">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">

        {/* IMAGE */}
        <div>
          <img
            src="/custom.jpg"
            alt="Custom Jewellery Design"
            className="rounded-3xl shadow-xl w-full h-[420px] object-cover"
          />
        </div>

        {/* CONTENT */}
        <div>
          <h2 className="text-3xl md:text-4xl font-luxury text-mocha">
            Custom Jewellery
          </h2>

          <p className="mt-5 text-mocha/75 text-base leading-relaxed">
            Design jewellery that reflects your personal style. 
            Choose the design, metal, stones, and size — our artisans 
            will craft it specially for you with precision and care.
          </p>

          {/* CUSTOMIZE BUTTON */}
          <button
            className="
              mt-8 px-9 py-3 rounded-full
              backdrop-blur-xl
              bg-white/30
              border border-softGold
              text-softGold text-sm tracking-wide
              hover:bg-softGold/20
              hover:text-mocha
              transition-all duration-300
            "
          >
            Customize Now →
          </button>
        </div>

      </div>
    </section>
  );
}
