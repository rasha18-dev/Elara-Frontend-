import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Customization() {
  return (
    <section className="relative bg-white py-32 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-champagne/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-antiqueGold/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">

          {/* ✅ Image Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative z-10 overflow-hidden rounded-[2px] shadow-2xl">
              <video
  src="/customization.mp4"
  autoPlay
  muted
  loop
  playsInline
  className="w-full h-[550px] object-cover transition-transform duration-[1.5s] ease-out hover:scale-105"
></video>

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80" />
            </div>

            {/* Offset Border Decoration */}
            <div className="absolute top-8 -left-8 w-full h-full border border-antiqueGold/30 z-0 hidden md:block" />
          </motion.div>

          {/* ✅ Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="md:pl-6"
          >
            <span className="text-antiqueGold text-xs font-bold tracking-[0.25em] uppercase mb-4 block">
              Bespoke Service
            </span>
            <h2 className="text-4xl md:text-5xl font-luxury text-richBlack mb-6 leading-tight">
              Designed by You, <br />
              <span className="italic text-antiqueGold">Crafted by Us</span>
            </h2>

            <div className="w-16 h-[1px] bg-richBlack/20 mb-8" />

            <p className="text-richBlack/70 text-lg leading-relaxed font-light mb-10">
              Experience the art of jewelry making with our bespoke customization service.
              Whether it's a unique engagement ring or a personalized gift, our artisans
              bring your vision to life with precision and passion.
            </p>

            <ul className="mb-10 space-y-4">
              {[
                "Personalized Consultation",
                "Handpicked Gemstones",
                "3D Design Preview",
                "Handcrafted Perfection"
              ].map((item, i) => (
                <li key={i} className="flex items-center text-richBlack/80 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-antiqueGold mr-4" />
                  {item}
                </li>
              ))}
            </ul>

            <Link
              to="/customization"
              className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-antiqueGold to-[#967543] text-white text-sm font-bold uppercase tracking-widest rounded-full shadow-lg hover:shadow-[0_10px_30px_rgba(176,141,85,0.5)] hover:-translate-y-1 transition-all duration-300 group"
            >
              Start Your Journey
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
