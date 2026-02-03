import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

import { toast } from "react-toastify";
import { Heart } from "lucide-react";
import { useFav } from "../context/FavouriteContext";


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
      className={`bg-white/90 backdrop-blur rounded-3xl shadow-sm border border-antiqueGold/15 p-6 ${isMobile ? "" : "sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto"
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
      <div className="mb-8">
        <p className="font-luxury text-[#5D4037] mb-3 text-sm uppercase tracking-widest">Sort By</p>
        <div className="relative">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full bg-[#FAFAFA] border border-[#E5E5E5] rounded-sm px-4 py-3 text-[#121212] font-medium focus:border-[#B08D55] outline-none appearance-none transition-colors cursor-pointer"
          >
            <option value="new">Newest Arrivals</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#5D4037]">↓</div>
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <p className="font-luxury text-[#5D4037] mb-3 text-sm uppercase tracking-widest">Price Range</p>
        <div className="grid grid-cols-2 gap-4">
          <input
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Min"
            type="number"
            className="w-full bg-[#FAFAFA] border border-[#E5E5E5] rounded-sm px-4 py-3 text-[#121212] focus:border-[#B08D55] outline-none transition-colors"
          />
          <input
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max"
            type="number"
            className="w-full bg-[#FAFAFA] border border-[#E5E5E5] rounded-sm px-4 py-3 text-[#121212] focus:border-[#B08D55] outline-none transition-colors"
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <p className="font-luxury text-[#5D4037] mb-4 text-sm uppercase tracking-widest">Categories</p>

        <div className="space-y-2 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`w-full text-left px-4 py-3 rounded-sm text-sm transition-all duration-300 flex items-center justify-between group
                ${category === cat
                  ? "bg-[#121212] text-white font-bold tracking-wider shadow-md"
                  : "bg-transparent text-[#5D4037] hover:bg-[#B08D55]/10 hover:pl-6"
                }
              `}
            >
              <span>{cat}</span>
              {category === cat && <span className="text-[#B08D55]">●</span>}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={resetFilters}
          className="mt-8 w-full px-4 py-3 rounded-sm border border-[#5D4037] text-[#5D4037] font-bold text-xs uppercase tracking-widest hover:bg-[#5D4037] hover:text-white transition-all duration-300"
        >
          Reset All
        </button>

        {isMobile && (
          <button
            type="button"
            onClick={() => setOpenFilter(false)}
            className="mt-3 w-full px-4 py-3 rounded-sm bg-[#121212] text-white font-bold text-xs uppercase tracking-widest hover:bg-[#B08D55] transition-all duration-300"
          >
            Show Results
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
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToFav, isFav } = useFav();


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

  // ✅ Sync category with URL
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
        // toast.success("Products loaded ✅");
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

  const handleAddToCart = async (product) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo?.token) {
      localStorage.setItem("pendingCart", JSON.stringify(product));
      localStorage.setItem("redirectAfterLogin", "/products");
      navigate("/login");
      return;
    }

    await axios.post(
      "http://localhost:5000/api/cart",
      {
        productId: product._id,
        qty: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    toast.success("Added to cart 🛒");
  };

  // ✅ Reset filters
  const resetFilters = () => {
    setSearch("");
    setDebouncedSearch("");
    setCategory("All");
    setSort("new");
    setMinPrice("");
    setMaxPrice("");
  };

  // ✅ Filter + Sort
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // ✅ category filter (handles extra spaces + case mismatch)
    if (category !== "All") {
      list = list.filter(
        (p) =>
          (p.category || "").trim().toLowerCase() ===
          category.trim().toLowerCase()
      );
    }

    // ✅ Search filter
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

    // ✅ price range filter
    const min = Number(minPrice);
    const max = Number(maxPrice);

    if (minPrice !== "" && !Number.isNaN(min)) {
      list = list.filter((p) => Number(p.price) >= min);
    }
    if (maxPrice !== "" && !Number.isNaN(max)) {
      list = list.filter((p) => Number(p.price) <= max);
    }

    // ✅ sorting
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
                <div
                  key={p._id}
                  className="group bg-white rounded-[32px] ..."
                >

                  <div className="relative overflow-hidden">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        const userInfo = JSON.parse(localStorage.getItem("userInfo"));

                        if (!userInfo?.token) {
                          toast.warning("Please login to add favourites ❤️");
                          navigate("/login");
                          return;
                        }

                        addToFav(p);
                        toast.success("Added to favourites ❤️");
                      }}
                      type="button"
                      className="absolute top-4 right-4 z-20 bg-white p-2 rounded-full shadow hover:scale-110 transition"
                    >
                      <Heart
                        size={20}
                        className={
                          isFav(p._id)
                            ? "fill-red-500 text-red-500"
                            : "text-gray-600"
                        }
                      />
                    </button>

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
                      <button
                        onClick={() => navigate(`/products/${p._id}`)}
                        className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-semibold shadow"
                      >
                        View Details →
                      </button>
                    </div>


                  </div>

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

                    <p className="text-sm text-gray-600 mt-1">
                      Weight: {p.weight}
                    </p>

                    <p
                      className={`text-xs font-semibold mt-2 ${(p.countInStock || 0) === 0
                        ? "text-red-600"
                        : "text-green-600"
                        }`}
                    >
                      {(p.countInStock || 0) === 0
                        ? "Out of Stock"
                        : "In Stock"}
                    </p>
                  </div>
                </div>
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
