import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

/* ✅ FILTER UI OUTSIDE (fix focus / typing issue) */
function FilterUI({
  isMobile = false,
  search,
  setSearch,
  sort,
  setSort,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  categories,
  category,
  setCategory,
  resetFilters,
  setOpenFilter,
}) {
  return (
    <div
      className={`bg-white/90 backdrop-blur rounded-3xl shadow-sm border border-antiqueGold/15 p-6 ${
        isMobile ? "" : "sticky top-20 h-fit"
      }`}
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-mocha text-lg">Filters</h3>

        {isMobile && (
          <button
            type="button"
            onClick={() => setOpenFilter(false)}
            className="text-xl font-bold"
          >
            ✕
          </button>
        )}
      </div>

      {/* Search */}
      <div className="mb-6">
        <p className="font-semibold text-mocha mb-2 text-sm">Search</p>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search jewellery..."
          className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      {/* Sort */}
      <div className="mb-6">
        <p className="font-semibold text-mocha mb-2 text-sm">Sort</p>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
        >
          <option value="new">Newest</option>
          <option value="low">Price: Low → High</option>
          <option value="high">Price: High → Low</option>
        </select>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <p className="font-semibold text-mocha mb-2 text-sm">Price Range</p>
        <div className="grid grid-cols-2 gap-3">
          <input
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Min ₹"
            type="number"
            className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />
          <input
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max ₹"
            type="number"
            className="w-full border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <p className="font-semibold text-mocha mb-3 text-sm">Category</p>

        <div className="space-y-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`w-full text-left px-4 py-2.5 rounded-2xl border text-sm font-semibold transition
                ${
                  category === cat
                    ? "bg-black text-white border-black"
                    : "bg-white text-mocha border-gray-200 hover:border-black"
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={resetFilters}
          className="mt-6 w-full px-4 py-3 rounded-2xl bg-antiqueGold text-white font-semibold hover:opacity-90 transition"
        >
          Reset Filters
        </button>

        {isMobile && (
          <button
            type="button"
            onClick={() => setOpenFilter(false)}
            className="mt-3 w-full px-4 py-3 rounded-2xl bg-black text-white font-semibold hover:opacity-90 transition"
          >
            Apply Filters
          </button>
        )}
      </div>
    </div>
  );
}

/* ✅ Skeleton OUTSIDE */
function SkeletonGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-[32px] border shadow-sm overflow-hidden animate-pulse"
        >
          <div className="h-72 bg-gray-200" />
          <div className="p-5 space-y-3">
            <div className="h-3 w-24 bg-gray-200 rounded" />
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-20 bg-gray-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Filters
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("new");

  // ✅ Price range
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // ✅ Mobile filter drawer
  const [openFilter, setOpenFilter] = useState(false);

  // ✅ URL category
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const categoryFromURL = query.get("category");

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

  // ✅ Sync category with URL (DON'T RESET to All always)
  useEffect(() => {
    if (categoryFromURL && categories.includes(categoryFromURL)) {
      setCategory(categoryFromURL);
    }
    // eslint-disable-next-line
  }, [categoryFromURL]);

  // ✅ Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 250);

    return () => clearTimeout(timer);
  }, [search]);

  // ✅ Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("http://localhost:5000/api/products");
        setProducts(data);
      } catch (error) {
        console.log(
          "FETCH PRODUCTS ERROR:",
          error?.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ✅ Reset filters
  const resetFilters = () => {
    setSearch("");
    setDebouncedSearch("");
    setCategory("All");
    setSort("new");
    setMinPrice("");
    setMaxPrice("");
  };

  // ✅ Filter + Sort (FULL SEARCH FIX)
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // category filter
    if (category !== "All") list = list.filter((p) => p.category === category);

    // ✅ Search filter (works for name/title/productName)
    if (debouncedSearch.trim()) {
      const keyword = debouncedSearch.toLowerCase();

      list = list.filter((p) => {
        const productName =
          p.name || p.title || p.productName || p.product_name || "";

        const productCategory = p.category || "";

        return (
          productName.toLowerCase().includes(keyword) ||
          productCategory.toLowerCase().includes(keyword)
        );
      });
    }

    // price range filter
    const min = Number(minPrice);
    const max = Number(maxPrice);

    if (minPrice !== "" && !Number.isNaN(min)) {
      list = list.filter((p) => Number(p.price) >= min);
    }
    if (maxPrice !== "" && !Number.isNaN(max)) {
      list = list.filter((p) => Number(p.price) <= max);
    }

    // sorting
    if (sort === "low") list.sort((a, b) => a.price - b.price);
    if (sort === "high") list.sort((a, b) => b.price - a.price);
    if (sort === "new") {
      list.sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      );
    }

    return list;
  }, [products, debouncedSearch, category, sort, minPrice, maxPrice]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-luxury text-mocha">
            {category !== "All" ? `${category} Collection` : "All Jewellery"}
          </h1>

          {/* ✅ When category selected from URL show back */}
          {category !== "All" && (
            <Link
              to="/products"
              className="inline-block mt-4 text-sm font-semibold text-antiqueGold hover:underline"
            >
              ← View All Products
            </Link>
          )}
        </div>

        {/* Mobile Filters */}
        <button
          type="button"
          onClick={() => setOpenFilter(true)}
          className="md:hidden px-5 py-3 rounded-2xl bg-black text-white font-semibold"
        >
          Filters
        </button>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-10">
        {/* Sidebar Desktop */}
        <div className="hidden md:block">
          <FilterUI
            search={search}
            setSearch={setSearch}
            sort={sort}
            setSort={setSort}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            categories={categories}
            category={category}
            setCategory={setCategory}
            resetFilters={resetFilters}
            setOpenFilter={setOpenFilter}
          />
        </div>

        {/* Products */}
        <main>
          {loading ? (
            <SkeletonGrid />
          ) : filteredProducts.length === 0 ? (
            <p className="text-gray-600">No products found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {filteredProducts.map((p) => (
                <Link
                  key={p._id}
                  to={`/product/${p._id}`}
                  className="group bg-white rounded-[32px] shadow-md hover:shadow-xl transition overflow-hidden border border-antiqueGold/10"
                >
                  {/* ✅ BIG IMAGE */}
                  <div className="relative overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name || p.title || "Product"}
                      className="
                        w-full
                        h-[320px] md:h-[360px]
                        object-cover
                        group-hover:scale-[1.08]
                        transition duration-700
                      "
                    />

                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition" />

                    <div className="absolute bottom-5 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition">
                      <span className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-semibold shadow">
                        View Product →
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <p className="text-xs font-semibold text-antiqueGold">
                      {p.category || "Jewellery"}
                    </p>

                    <h3 className="text-lg font-semibold text-mocha mt-1 line-clamp-1">
                      {p.name || p.title || p.productName || "Product"}
                    </h3>

                    <p className="text-base font-bold text-mocha mt-2">
                      ₹ {p.price}
                    </p>

                    <p
                      className={`text-xs font-semibold mt-2 ${
                        (p.countInStock || 0) === 0
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {(p.countInStock || 0) === 0
                        ? "Out of Stock"
                        : "In Stock"}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile filter drawer */}
      {openFilter && (
        <div className="fixed inset-0 z-[999] bg-black/50 flex justify-center items-end md:hidden">
          <div className="w-full max-w-lg rounded-t-3xl bg-white p-5 shadow-xl">
            <FilterUI
              isMobile={true}
              search={search}
              setSearch={setSearch}
              sort={sort}
              setSort={setSort}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              categories={categories}
              category={category}
              setCategory={setCategory}
              resetFilters={resetFilters}
              setOpenFilter={setOpenFilter}
            />
          </div>
        </div>
      )}
    </div>
  );
}
