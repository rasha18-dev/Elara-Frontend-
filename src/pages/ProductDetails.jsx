import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { Heart, Share2, ArrowLeft, Zap, Truck, Shield, Clock } from "lucide-react";
import { useFav } from "../context/FavouriteContext";
import { requireLogin } from "../utils/authCheck";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // ✅ Favourite context
  const { addToFav, removeFromFav, isFav } = useFav();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ fetch product
  const fetchProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:5000/api/products/${id}`
      );
      setProduct(data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Product fetch failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F6F0]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B08D55] mx-auto mb-4"></div>
          <p className="text-[#5D4037] font-medium tracking-wide">Loading masterpiece...</p>
        </div>
      </div>
    );
  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F6F0]">
        <p className="text-center text-[#5D4037] text-lg font-luxury">Product not found</p>
      </div>
    );

  // ✅ check favourite
  const fav = isFav(product._id);

  const handleFav = () => {
    if (!requireLogin(navigate)) return;

    if (fav) {
      removeFromFav(product._id);
      toast.error("Removed from favourites 💔");
    } else {
      addToFav(product);
      toast.success("Added to favourites ❤️");
    }
  };


  const handleAddToCart = () => {
    // ✅ Login check
    if (!requireLogin(navigate)) return;

    addToCart({ ...product, qty: 1 });


    navigate("/cart");
  };

  const handleShopNow = () => {
    // ✅ Login check
    if (!requireLogin(navigate)) return;

    addToCart({
      _id: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      category: product.category,
      countInStock: product.countInStock,
    });

    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-[#F9F6F0] py-16 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Navigation */}
        <button
          onClick={() => navigate("/products")}
          className="group flex items-center gap-2 text-[#5D4037] mb-12 hover:text-[#B08D55] transition-colors duration-300"
        >
          <div className="w-8 h-8 rounded-full border border-[#5D4037]/20 flex items-center justify-center group-hover:bg-[#B08D55] group-hover:border-[#B08D55] transition-all duration-300">
            <ArrowLeft size={14} className="group-hover:text-white transition-colors" />
          </div>
          <span className="text-sm font-bold uppercase tracking-widest">Back to Collection</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-start">

          {/* ✅ Left Column - Image */}
          <div className="relative group">
            <div className="relative aspect-square max-w-[450px] mx-auto bg-white rounded-sm overflow-hidden shadow-2xl">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-in-out hover:scale-105"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Badges */}
            <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
              {product.countInStock > 0 ? (
                <span className="bg-[#121212] text-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest shadow-lg">
                  In Stock
                </span>
              ) : (
                <span className="bg-red-500 text-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest shadow-lg">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Floating Actions */}
            <div className="absolute top-6 right-6 z-20 flex flex-col gap-3">
              <button
                onClick={handleFav}
                className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-[#B08D55] hover:text-white transition-all duration-300 group/btn"
              >
                <Heart
                  size={18}
                  className={fav ? "text-red-500 group-hover/btn:text-white" : "text-[#5D4037] group-hover/btn:text-white"}
                  fill={fav ? "currentColor" : "none"}
                />
              </button>

              <button
                onClick={async () => {
                  const url = window.location.href;
                  const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);
                  if (isMobile && navigator.share && product.image) {
                    try {
                      const res = await fetch(product.image);
                      const blob = await res.blob();
                      const file = new File([blob], "product.jpg", { type: blob.type });
                      await navigator.share({
                        title: product.name,
                        text: product.name,
                        files: [file],
                      });
                      return;
                    } catch (e) { console.log("mobile share failed"); }
                  }
                  const msg = `${product.name}\n${url}`;
                  window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
                }}
                className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-[#B08D55] hover:text-white transition-all duration-300"
              >
                <Share2 size={18} className="text-[#5D4037] group-hover:text-white" />
              </button>
            </div>

            {/* Decorative Offset Border */}
            <div className="absolute top-6 -left-6 w-full h-full border border-[#B08D55]/20 z-[-1] hidden md:block" />
          </div>

          {/* ✅ Right Column - Details */}
          <div className="flex flex-col h-full justify-center">

            <div className="mb-8">
              <p className="text-[#B08D55] font-bold text-xs uppercase tracking-[0.2em] mb-4">
                {product.category} Collection
              </p>
              <h1 className="text-4xl md:text-5xl font-luxury text-[#121212] mb-6 leading-tight">
                {product.name}
              </h1>
              <p className="text-[#5D4037]/80 leading-relaxed font-light text-lg">
                {product.description}
              </p>
            </div>

            {/* Price Block */}
            <div className="py-8 border-y border-[#B08D55]/20 mb-8">
              <div className="flex items-end gap-4 mb-2">
                <span className="text-4xl font-luxury text-[#121212]">₹ {product.price.toLocaleString()}</span>
                <span className="text-lg text-[#5D4037]/40 line-through mb-1 font-light">₹ {(product.price * 1.2).toLocaleString()}</span>
              </div>
              <p className="text-[#B08D55] text-sm font-medium">
                Inclusive of all taxes • Free shipping included
              </p>
            </div>

            {/* Weight & Stock */}
            <div className="grid grid-cols-2 gap-8 mb-10">
              <div>
                <p className="text-xs text-[#121212]/50 uppercase tracking-wider mb-1">Total Weight</p>
                <p className="text-xl font-luxury text-[#121212]">{product.weight}</p>
              </div>
              <div>
                <p className="text-xs text-[#121212]/50 uppercase tracking-wider mb-1">Availability</p>
                <p className={`text-xl font-luxury ${product.countInStock > 0 ? "text-[#121212]" : "text-red-500"}`}>
                  {product.countInStock > 0 ? "In Stock" : "Unavailable"}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 mb-12">
              <button
                disabled={product.countInStock === 0}
                onClick={handleAddToCart}
                className="w-full bg-[#121212] text-white py-4 text-sm font-bold uppercase tracking-widest hover:bg-[#B08D55] disabled:opacity-50 disabled:hover:bg-[#121212] transition-all duration-300 shadow-xl"
              >
                Add to Cart
              </button>

              <button
                disabled={product.countInStock === 0}
                onClick={handleShopNow}
                className="w-full bg-white border border-[#121212] text-[#121212] py-4 text-sm font-bold uppercase tracking-widest hover:bg-[#121212] hover:text-white disabled:opacity-50 transition-all duration-300"
              >
                Buy Now
              </button>
            </div>

            {/* Features Info */}
            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
              {[
                { icon: <Zap size={18} />, label: "Fast Delivery", sub: "2-3 Business Days" },
                { icon: <Shield size={18} />, label: "Authentic", sub: "Certified Quality" },
                { icon: <Truck size={18} />, label: "Free Shipping", sub: "On all orders" },
                { icon: <Clock size={18} />, label: "Easy Returns", sub: "15 Day Policy" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="text-[#B08D55] mt-0.5">{item.icon}</div>
                  <div>
                    <p className="text-sm font-bold text-[#121212]">{item.label}</p>
                    <p className="text-xs text-[#121212]/60">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
