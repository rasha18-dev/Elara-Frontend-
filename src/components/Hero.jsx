import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image: "/newbanner.jpg",
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
          className={`absolute inset-0 transition-all duration-[1400ms] ease-out
            ${
              index === current
                ? "opacity-100 scale-110"
                : "opacity-0 scale-100"
            }`}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}

      {/* ✅ Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/30 to-transparent" />
      <div className="absolute inset-0 bg-champagne/10" />

      {/* ✅ Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32">
        <div
          className={`
            max-w-3xl
            rounded-[36px]
            border border-white/30
            bg-white/15
            backdrop-blur-xl
            p-10 md:p-14
            shadow-[0_20px_70px_rgba(0,0,0,0.25)]
            transition-all duration-700 ease-out
            ${
              animate
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }
          `}
        >
          {/* ✅ Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 border border-white/30 text-white text-xs tracking-wider mb-6">
            ✨ {slides[current].tag}
          </div>

          {/* ✅ Title */}
          <h1 className="text-4xl md:text-6xl font-luxury text-white leading-tight whitespace-pre-line drop-shadow">
            {slides[current].title}
          </h1>

          {/* ✅ Description */}
          <p className="mt-6 text-white/85 text-base md:text-lg leading-relaxed">
            {slides[current].description}
          </p>

          {/* ✅ Only One Button */}
          <button
            onClick={() => navigate("/products")}
            className="
              mt-9 px-9 py-3 rounded-full
              bg-antiqueGold text-white font-semibold tracking-wide
              hover:opacity-95
              hover:shadow-[0_0_35px_rgba(212,175,55,0.75)]
              transition-all duration-300
            "
          >
            Explore Our Collection →
          </button>

          {/* ✅ Smaller Overlay Dots */}
          <div className="mt-10 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  current === i ? "w-8 bg-antiqueGold" : "w-2 bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ✅ Prev / Next arrows */}
      <button
        onClick={goPrev}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 hidden md:flex
          bg-white/15 border border-white/20 backdrop-blur-xl rounded-full p-3
          hover:bg-white/25 transition"
      >
        <ChevronLeft className="text-white" />
      </button>

      <button
        onClick={goNext}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 hidden md:flex
          bg-white/15 border border-white/20 backdrop-blur-xl rounded-full p-3
          hover:bg-white/25 transition"
      >
        <ChevronRight className="text-white" />
      </button>

      {/* ✅ Bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-36 bg-gradient-to-t from-ivory to-transparent" />
    </section>
  );
}
