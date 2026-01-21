import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function FeaturedProducts() {
  const featured = [
    {
      image: "/wedfeat.jpg",
      title: "Wedding ",
      desc: "Premium wedding rings crafted for forever moments.",
      link: "/products?category=Wedding%20Rings",
      tag: "Best Seller",
    },
    {
      image: "/neklaceset.jpg",
      title: "Diamond Collection",
      desc: "Brilliant diamonds with luxurious sparkle.",
      link: "/products?category=Diamond",
      tag: "Luxury",
    },
    {
      image: "/pearl.jpg",
      title: "Elegant Earrings",
      desc: "Minimal & elegant designs for special occasions.",
      link: "/products?category=Earrings",
      tag: "Trending",
    },
  ];

  const cardVariant = {
    hidden: { opacity: 0, y: 25 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: i * 0.15, ease: "easeOut" },
    }),
  };

  return (
    <section className="relative bg-ivory py-24 overflow-hidden">
      {/* ✅ Background glow design */}
      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-antiqueGold/15 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-softBrown/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* ✅ Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-luxury text-mocha tracking-wide">
            Featured Collections
          </h2>
          <p className="mt-3 text-mocha/70 text-sm md:text-base">
            Handpicked designs loved by our customers
          </p>
        </motion.div>

        {/* ✅ Animated Cards */}
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
          {featured.map((item, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-lg border border-antiqueGold/20 bg-white/50 backdrop-blur-xl">
                {/* ✅ Tag */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide
                    bg-white/70 backdrop-blur border border-antiqueGold/30 text-mocha">
                    {item.tag}
                  </span>
                </div>

                {/* ✅ ONLY IMAGE CLICKABLE */}
                <Link to={item.link} className="block">
                  <div className="relative overflow-hidden">
                    {/* image */}
                    <motion.img
                      src={item.image}
                      alt={item.title}
                      className="h-72 w-full object-cover cursor-pointer"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />

                    {/* dark overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent opacity-70 group-hover:opacity-90 transition duration-300" />

                    {/* hover text */}
                    <div className="absolute inset-0 flex items-end justify-between p-6">
                      <div>
                        <h3 className="text-white text-xl font-luxury drop-shadow">
                          {item.title}
                        </h3>
                        <p className="text-white/85 text-sm mt-1 max-w-[220px]">
                          {item.desc}
                        </p>
                      </div>

                      {/* ✅ Appears only on hover */}
                      <div className="opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition duration-300">
                        <span className="px-4 py-2 rounded-full text-sm font-semibold
                          bg-antiqueGold text-mocha shadow-md">
                          Shop Now →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              {/* ✅ extra small info below card (different design feel) */}
              <div className="mt-4 px-2">
                <p className="text-mocha text-sm tracking-wide">
                  Explore{" "}
                  <span className="font-semibold text-antiqueGold">
                    {item.title}
                  </span>{" "}
                  collections
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ✅ Bottom decorative line */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: "100%", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-16 h-[1px] bg-gradient-to-r from-transparent via-antiqueGold/40 to-transparent"
        />
      </div>
    </section>
  );
}
