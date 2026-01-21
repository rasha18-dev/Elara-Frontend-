import { Link } from "react-router-dom";

export default function Customization() {
  return (
    <section className="bg-white/60 py-24">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
        {/* IMAGE */}
        <div className="relative group">
          <img
            src="/custmm.jpg"
            alt="Custom Jewellery Design"
            className="rounded-3xl shadow-xl w-full h-[420px] object-cover transition duration-500 group-hover:scale-[1.02]"
          />

          {/* overlay */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
        </div>

        {/* CONTENT */}
        <div>
          <h2 className="text-3xl md:text-4xl font-luxury text-mocha">
            Custom Jewellery
          </h2>

          <p className="mt-5 text-mocha/75 text-base leading-relaxed">
            Design jewellery that reflects your personal style. Choose the
            design, metal, stones, and size — our artisans will craft it
            specially for you with precision and care.
          </p>

          {/* ✅ BUTTON -> PAGE */}
          <Link
            to="/customization"
            className="
              inline-block mt-8 px-9 py-3 rounded-full
              backdrop-blur-xl bg-white/30
              border border-softGold
              text-softGold text-sm tracking-wide
              hover:bg-softGold/20 hover:text-mocha
              hover:shadow-[0_0_25px_rgba(212,175,55,0.35)]
              transition-all duration-300
            "
          >
            Customize Now →
          </Link>
        </div>
      </div>
    </section>
  );
}
