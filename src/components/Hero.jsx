import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image: "/womens.jpeg",
    title: "Timeless Gold\nJewellery",
    description:
      "Crafted with purity and elegance, our gold collection defines luxury.",
    tag: "Gold Collection",
  },
  {
    image: "/diamond.jpg",
    title: "Brilliant Diamond\nCollection",
    description:
      "Shine with confidence through our handpicked diamond masterpieces.",
    tag: "Diamond Collection",
  },
  {
    image: "/bridal.jpg",
    title: "Elegant Bridal\nJewellery",
    description:
      "Celebrate your special moments with timeless bridal designs.",
    tag: "Bridal Collection",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [animate, setAnimate] = useState(true);

  const navigate = useNavigate();

  // ✅ Auto slider
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
        setAnimate(true);
      }, 200);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const goPrev = () => {
    setAnimate(false);
    setTimeout(() => {
      setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
      setAnimate(true);
    }, 150);
  };

  const goNext = () => {
    setAnimate(false);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
      setAnimate(true);
    }, 150);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* ✅ Background slides with zoom */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-transform duration-[2000ms] ease-out
            ${index === current
              ? "scale-105"
              : "scale-100"
            }`}
        >
          <div
            className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out
               ${index === current ? "opacity-100" : "opacity-0"}
             `}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>
      ))}

      {/* ✅ Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-richBlack/70 via-richBlack/30 to-transparent" />
      <div className="absolute inset-0 bg-black/10" />

      {/* ✅ Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
        <div
          className={`
            max-w-3xl
            transition-all duration-1000 ease-out transform
            ${animate
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
            }
          `}
        >
          {/* ✅ Tag */}
          <div className="inline-flex items-center gap-3 px-5 py-2 mb-8 border-l-2 border-antiqueGold/80 pl-4">
            <span className="text-antiqueGold text-sm font-semibold tracking-[0.2em] uppercase">
              {slides[current].tag}
            </span>
          </div>

          {/* ✅ Title */}
          <h1 className="text-5xl md:text-7xl font-luxury font-medium text-ivory leading-tight drop-shadow-lg">
            {slides[current].title}
          </h1>

          {/* ✅ Description */}
          <p className="mt-8 text-white/90 text-lg font-light leading-relaxed max-w-xl opacity-90">
            {slides[current].description}
          </p>

          {/* ✅ Only One Button */}
          <button
            onClick={() => navigate("/products")}
            className="
              mt-12 px-10 py-4 rounded-none
              bg-antiqueGold text-white text-sm font-bold tracking-widest uppercase
              hover:bg-white hover:text-richBlack
              transition-all duration-500 ease-out
              shadow-[0_4px_14px_0_rgba(0,0,0,0.39)] hover:shadow-[0_6px_20px_rgba(255,255,255,0.23)]
            "
          >
            Explore Collection
          </button>

          {/* ✅ Custom Dots */}
          <div className="mt-16 flex gap-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-[3px] transition-all duration-500 rounded-full ${current === i ? "w-12 bg-antiqueGold" : "w-6 bg-white/30 hover:bg-white/60"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ✅ Prev / Next arrows */}
      <div className="absolute bottom-12 right-12 z-20 hidden md:flex gap-4">
        <button
          onClick={goPrev}
          className="
            group flex items-center justify-center w-14 h-14 rounded-full
            border border-white/20 backdrop-blur-sm bg-white/5
            hover:bg-white/10 hover:border-white/40 transition-all duration-300
          "
        >
          <ChevronLeft className="text-white opacity-70 group-hover:opacity-100 transition" />
        </button>

        <button
          onClick={goNext}
          className="
             group flex items-center justify-center w-14 h-14 rounded-full
            border border-white/20 backdrop-blur-sm bg-white/5
            hover:bg-white/10 hover:border-white/40 transition-all duration-300
          "
        >
          <ChevronRight className="text-white opacity-70 group-hover:opacity-100 transition" />
        </button>
      </div>
    </section>
  );
}
