import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const collections = [
  {
    title: "Rings",
    subtitle: "Timeless everyday luxury",
    image: "/Ring.jpg",
    link: "/products?category=Rings",
    height: "h-[400px] md:h-[480px]",
    colSpan: "md:col-span-1",
  },
  {
    title: "Necklace",
    subtitle: "Signature statement pieces",
    image: "/nekalace.jpg",
    link: "/products?category=Necklace",
    height: "h-[300px] md:h-[350px]",
    colSpan: "md:col-span-1",
  },
  {
    title: "Earrings",
    subtitle: "Elegant modern designs",
    image: "/earings.jpg",
    link: "/products?category=Earrings",
    height: "h-[350px] md:h-[400px]",
    colSpan: "md:col-span-1",
  },
  {
    title: "Anklets",
    subtitle: "Minimal & classy styles",
    image: "/anklets.jpg",
    link: "/products?category=Anklets",
    height: "h-[280px] md:h-[430px]",
    colSpan: "md:col-span-1",
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
    <section className="bg-softGray py-14" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div
          className={`text-center mb-20 transition-all duration-1000 ease-out
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
          `}
        >
          <span className="text-antiqueGold text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
            New Arrivals
          </span>
          <h2 className="text-4xl md:text-5xl font-luxury text-richBlack tracking-tight">
            Latest Collections
          </h2>
          <p className="mt-6 text-richBlack/60 text-base max-w-2xl mx-auto font-light leading-relaxed">
            Discover our newest additions, crafted with precision to bring timeless elegance to your everyday life.
          </p>
        </div>

        {/* ✅ Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {collections.map((c, idx) => (
            <Link
              key={c.title}
              to={c.link}
              style={{ transitionDelay: `${idx * 150}ms` }}
              className={`
                group relative block overflow-hidden rounded-[2px] shadow-sm hover:shadow-2xl
                transition-all duration-700 ease-out
                ${c.colSpan}
                ${c.height}
                ${visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
                }
              `}
            >


              {/* IMAGE */}
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src={c.image}
                  alt={c.title}
                  className="
                    h-full w-full object-cover
                    transition duration-[1.2s] ease-out
                    group-hover:scale-110
                  "
                />

                {/* dark overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />

                {/* border inset */}
                <div className="absolute inset-4 border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>

              {/* CONTENT */}
              <div className="absolute bottom-0 left-0 w-full p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-2xl font-luxury text-white mb-2">{c.title}</h3>
                <p className="text-white/80 text-sm font-light mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{c.subtitle}</p>

                <div className="flex items-center gap-3">
                  <span className="text-antiqueGold text-xs font-bold uppercase tracking-widest border-b border-antiqueGold pb-1">Explore</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
