import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const collections = [
  {
    title: "Rings",
    subtitle: "Timeless everyday luxury",
    image: "/Ring.jpg",
    link: "/products?category=Rings",
    height: "h-[360px] md:h-[420px]",
  },
  {
    title: "Necklace",
    subtitle: "Signature statement pieces",
    image: "/nekalace.jpg",
    link: "/products?category=Necklace",
    height: "h-[260px] md:h-[300px]",
  },
  {
    title: "Earrings",
    subtitle: "Elegant modern designs",
    image: "/earings.jpg",
    link: "/products?category=Earrings",
    height: "h-[300px] md:h-[360px]",
  },
  {
    title: "Anklets",
    subtitle: "Minimal & classy styles",
    image: "/anklets.jpg",
    link: "/products?category=Anklets",
    height: "h-[240px] md:h-[280px]",
  },
];

export default function SectionLatest() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  // ✅ Scroll animation
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.18 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="bg-ivory py-24" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div
          className={`text-center mb-16 transition-all duration-700 ease-out
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
        >
          <h2 className="text-3xl md:text-5xl font-luxury text-mocha">
            Latest Collections
          </h2>
          <p className="mt-4 text-mocha/70 text-sm md:text-base max-w-2xl mx-auto">
            Discover fresh arrivals crafted with elegance and precision ✨
          </p>
        </div>

        {/* ✅ Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-4 gap-6 space-y-6">
          {collections.map((c, idx) => (
            <Link
              key={c.title}
              to={c.link}
              style={{ transitionDelay: `${idx * 120}ms` }}
              className={`
                group relative block break-inside-avoid
                rounded-[32px] overflow-hidden
                bg-white/50 backdrop-blur-xl
                border border-antiqueGold/15
                shadow-md hover:shadow-xl
                transition-all duration-700 ease-out
                hover:-translate-y-1
                ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }
              `}
            >
              {/* ✅ LUXURY SHIMMER EFFECT */}
              <div
                className="
                  pointer-events-none absolute inset-0 z-20
                  opacity-0 group-hover:opacity-100 transition duration-500
                "
              >
                {/* moving shine */}
                <div
                  className="
                    absolute -left-[60%] top-0 h-full w-[60%]
                    bg-gradient-to-r from-transparent via-white/35 to-transparent
                    rotate-12
                    translate-x-0
                    group-hover:translate-x-[260%]
                    transition-transform duration-[900ms] ease-out
                  "
                />
              </div>

              {/* IMAGE */}
              <div className={`relative w-full overflow-hidden ${c.height}`}>
                <img
                  src={c.image}
                  alt={c.title}
                  className="
                    h-full w-full object-cover
                    transition duration-700
                    group-hover:scale-[1.12]
                  "
                />

                {/* overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-90" />

                {/* glow border on hover */}
                <div className="absolute inset-0 ring-0 group-hover:ring-2 ring-antiqueGold/70 transition" />

                {/* floating glow */}
                <div className="absolute -inset-10 opacity-0 group-hover:opacity-100 transition duration-700 blur-3xl">
                  <div className="w-full h-full bg-antiqueGold/10" />
                </div>
              </div>

              {/* CONTENT */}
              <div className="relative z-10 p-5">
                <h3 className="text-xl font-luxury text-mocha">{c.title}</h3>
                <p className="text-xs text-mocha/70 mt-2">{c.subtitle}</p>

                <p className="mt-4 text-sm font-semibold text-antiqueGold">
                  Explore →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
