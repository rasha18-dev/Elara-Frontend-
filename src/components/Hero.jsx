import { useEffect, useState } from "react";

const slides = [
  {
    image: "/newbanner.jpg",
    title: "Timeless Gold\nJewellery",
    description:
      "Crafted with purity and elegance, our gold collection defines luxury.",
  },
  {
    image: "/diamond.jpg",
    title: "Brilliant Diamond\nCollection",
    description:
      "Shine with confidence through our handpicked diamond masterpieces.",
  },
  {
    image: "/bridal.jpg",
    title: "Elegant Bridal\nJewellery",
    description:
      "Celebrate your special moments with timeless bridal designs.",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [animate, setAnimate] = useState(true);

  // slider logic
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(false); // reset animation
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
        setAnimate(true);
      }, 200);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">

      {/* BACKGROUND IMAGE */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000
            ${index === current ? "opacity-100" : "opacity-0"}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        />
      ))}

      {/* OVERLAY */}
     <div className="absolute inset-0 bg-champagne/15"></div>


      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 mt-10">
        <div
          className={`
            max-w-3xl
            backdrop-blur-sm
            bg-white/40
            border border-white/50
            rounded-3xl
            p-14
            shadow-xl
            transition-all duration-700 ease-out
            ${
              animate
                ? "opacity-100 -translate-y-6 md:-translate-y-16"
                : "opacity-0 translate-y-6"
            }
          `}
        >
          <h1 className="text-4xl md:text-6xl font-luxury text-mocha leading-tight whitespace-pre-line">
            {slides[current].title}
          </h1>

          <p className="mt-6 text-mocha/80 text-base md:text-lg leading-relaxed">
            {slides[current].description}
          </p>

          {/* TRANSPARENT GLASS BUTTON */}
          <button
            className="
              mt-8 px-8 py-3 rounded-full
              backdrop-blur-xl
              bg-white/30
              border border-antiqueGold/60
              text-antiqueGold text-sm tracking-wide
              hover:bg-antiqueGold/20
              hover:text-mocha
              hover:shadow-[0_0_25px_rgba(212,175,55,0.7)]
              transition-all duration-300
            "
          >
            Explore Collection →
          </button>
        </div>
      </div>

      {/* BOTTOM FADE */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-ivory to-transparent"></div>
    </section>
  );
}
