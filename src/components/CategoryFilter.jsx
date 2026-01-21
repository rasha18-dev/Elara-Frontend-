import { Link, useLocation } from "react-router-dom";

const categories = [
  "All",
  "Diamond",
  "Bridal",
  "Earrings",
  "Rings",
  "Bangles",
  "Anklets",
  "Wedding Rings",
  "Necklace",
];

export default function CategoryFilter() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const activeCategory = query.get("category") || "All";

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {categories.map((cat) => (
        <Link
          key={cat}
          to={
            cat === "All"
              ? "/products"
              : `/products?category=${encodeURIComponent(cat)}`
          }
          className={`px-4 py-2 rounded-full border text-sm font-semibold transition
            ${
              activeCategory === cat
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-gray-100"
            }`}
        >
          {cat}
        </Link>
      ))}
    </div>
  );
}
