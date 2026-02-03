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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4AF37] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-center text-gray-600 text-lg">Product not found</p>
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/products")}
          className="flex items-center gap-2 text-[#2B1B14] hover:text-[#D4AF37] transition mb-8 font-semibold"
        >
          <ArrowLeft size={20} />
          Back to Products
        </button>

        {/* Product Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {/* Image Section */}
          <div className="flex flex-col gap-4">
            <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg">

  <img
    src={product.image}
    alt={product.name}
    className="w-full h-[500px] object-cover hover:scale-105 transition duration-300"
  />

  {/* Stock Badge */}
  <div className="absolute top-6 left-6 z-20">
    {product.countInStock > 0 && (
      <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
        In Stock
      </span>
    )}
  </div>

  {/* Favourite */}
  <button
    onClick={handleFav}
    className="absolute top-6 right-6 z-20 bg-white shadow-lg p-3 rounded-full hover:scale-110 transition"
  >
    <Heart
      size={22}
      className={fav ? "text-red-500" : "text-gray-400"}
      fill={fav ? "currentColor" : "none"}
    />
  </button>

  {/* Share */}
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
        } catch (e) {
          console.log("mobile share failed");
        }
      }

      const msg = `${product.name}\n${url}`;
      window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
    }}
    className="absolute top-6 right-20 z-20 bg-white shadow-lg p-3 rounded-full hover:scale-110 transition"
  >
    <Share2 size={22} />
  </button>

</div>

          </div>
       

          {/* Details Section */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <p className="text-[#D4AF37] font-semibold text-sm uppercase tracking-wider mb-2">
                {product.category}
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-[#2B1B14] mb-4">
                {product.name}
              </h1>
              <p className="text-gray-600 leading-relaxed text-lg">
                {product.description}
              </p>
            </div>

            {/* Price */}
            <div className="border-y py-6">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-[#D4AF37]">₹ {product.price.toLocaleString()}</span>
                <span className="text-sm text-gray-500 line-through">₹ {(product.price * 1.2).toLocaleString()}</span>
              </div>
              <p className="text-green-600 font-semibold text-sm mt-2">Save ₹ {(product.price * 0.2).toLocaleString()}</p>
            </div>
            {/* Weight */}
<div className="bg-white rounded-xl p-4 shadow">
  <p className="text-sm text-gray-600">Weight</p>
  <p className="text-lg font-bold text-[#2B1B14]">
    {product.weight}
  </p>
</div>

            {/* Stock Status */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
              <p className="text-sm text-gray-600 mb-1">Availability</p>
              <p className="text-lg font-bold text-[#2B1B14]">
                {product.countInStock > 0
                  ? `${product.countInStock} items in stock`
                  : "Out of Stock"}
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow">
                <Zap size={20} className="text-[#D4AF37]" />
                <div>
                  <p className="text-xs text-gray-600">Fast Delivery</p>
                  <p className="font-semibold text-[#2B1B14]">2-3 Days</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow">
                <Truck size={20} className="text-[#D4AF37]" />
                <div>
                  <p className="text-xs text-gray-600">Free Shipping</p>
                  <p className="font-semibold text-[#2B1B14]">Above ₹5000</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow">
                <Shield size={20} className="text-[#D4AF37]" />
                <div>
                  <p className="text-xs text-gray-600">Authentic</p>
                  <p className="font-semibold text-[#2B1B14]">Certified</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow">
                <Clock size={20} className="text-[#D4AF37]" />
                <div>
                  <p className="text-xs text-gray-600">Easy Returns</p>
                  <p className="font-semibold text-[#2B1B14]">15 Days</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <button
                disabled={product.countInStock === 0}
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-[#2B1B14] to-[#4A2F25] text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition transform hover:scale-105 active:scale-95"
              >
                Add to Cart
              </button>

              <button
                disabled={product.countInStock === 0}
                onClick={handleShopNow}
                className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B68D2C] text-[#2B1B14] py-4 rounded-xl font-bold text-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition transform hover:scale-105 active:scale-95"
              >
                Buy Now
              </button>
            </div>

           


          </div>
        </div>
      </div>
    </div>
  );
}
