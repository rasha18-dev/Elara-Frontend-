import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function FeaturedProducts() {
  const featured = [
    {
      image: "/wedfeat.jpg",
      title: "Wedding Collection",
      desc: "Premium wedding rings crafted for forever moments.",
      link: "/products?category=Bridal",
      tag: "Best Seller",
    },
    {
      image: "/neklaceset.jpg",
      title: "Diamond Brilliance",
      desc: "Brilliant diamonds with luxurious sparkle for every occasion.",
      link: "/products?category=Diamond",
      tag: "Luxury",
    },
    {
      image: "/pearl.jpg",
      title: "Elegant Earrings",
      desc: "Minimal & elegant designs that define sophistication.",
      link: "/products?category=Earrings",
      tag: "Trending",
    },
  ];

  const cardVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <section className="relative bg-ivory py-32 overflow-hidden">
      {/* ✅ Background glow design */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-white/80 to-transparent pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-antiqueGold/5 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-softBrown/5 blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* ✅ Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <span className="text-antiqueGold text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
            Curated For You
          </span>
          <h2 className="text-4xl md:text-5xl font-luxury text-richBlack tracking-tight mb-6">
            Featured Collections
          </h2>
          <p className="mx-auto max-w-xl text-richBlack/60 text-base leading-relaxed font-light">
            Discover our handpicked selection of timeless pieces, designed to celebrate elegance and purity.
          </p>
        </motion.div>

        {/* ✅ Animated Cards */}
        <div className="grid gap-8 md:gap-12 md:grid-cols-3">
          {featured.map((item, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="group relative"
            >
              <Link to={item.link} className="block relative z-10">
                {/* ✅ Card Container */}
                <div className="relative overflow-hidden rounded-[2px] bg-white shadow-luxury transition-all duration-500 hover:shadow-luxury-hover">

                  {/* ✅ Tag */}
                  <div className="absolute top-6 left-6 z-20">
                    <span className="px-4 py-1.5 text-[10px] uppercase font-bold tracking-widest bg-white text-richBlack shadow-sm">
                      {item.tag}
                    </span>
                  </div>

                  {/* ✅ Image */}
                  <div className="relative h-[420px] overflow-hidden">
                    <motion.img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-110"
                    />

                    {/* ✅ Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40" />

                    {/* ✅ Hover "View Collection" Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30">
                      <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40 transform scale-75 group-hover:scale-100 transition-transform duration-500">
                        <span className="text-white text-2xl font-light">→</span>
                      </div>
                    </div>
                  </div>

                  {/* ✅ Content Box */}
                  <div className="p-8 bg-white relative">
                    <div className="absolute -top-10 right-8 w-20 h-20 bg-antiqueGold rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl" />

                    <h3 className="text-2xl font-luxury text-richBlack mb-3 group-hover:text-antiqueGold transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-richBlack/60 text-sm leading-relaxed mb-6 font-light">
                      {item.desc}
                    </p>

                    <span className="inline-block text-xs font-bold uppercase tracking-widest text-richBlack border-b border-richBlack/20 pb-1 group-hover:border-antiqueGold transition-all duration-300">
                      Shop Now
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
