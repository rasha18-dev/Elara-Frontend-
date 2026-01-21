import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { Heart } from "lucide-react";
import { useFav } from "../context/FavouriteContext";
import { requireLogin } from "../utils/authCheck";

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
      alert(error?.response?.data?.message || "Product fetch failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) return <p className="p-6 text-center">Loading...</p>;
  if (!product) return <p className="p-6 text-center">Product not found</p>;

  // ✅ check favourite
  const fav = isFav(product._id);

  const handleFav = () => {
    // ✅ Login check
    if (!requireLogin(navigate)) return;

    if (fav) removeFromFav(product._id);
    else addToFav(product);
  };

  const handleAddToCart = () => {
    // ✅ Login check
    if (!requireLogin(navigate)) return;

    addToCart({
      _id: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      countInStock: product.countInStock,
    });

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
      countInStock: product.countInStock,
    });

    navigate("/checkout");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Back */}
      <Link
        to="/products"
        className="text-sm font-semibold text-[#D4AF37] hover:text-[#B68D2C]"
      >
        ← Back to Products
      </Link>

      {/* Product UI */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-6">
        {/* Image */}
        <div className="w-full relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[420px] object-cover rounded-2xl shadow"
          />

          {/* ❤️ Favourite button on image */}
          <button
            onClick={handleFav}
            className="absolute top-4 right-4 bg-white/90 backdrop-blur p-3 rounded-full shadow hover:scale-105 transition"
            title={fav ? "Remove from favourites" : "Add to favourites"}
          >
            <Heart
              size={22}
              className={fav ? "text-red-500" : "text-gray-700"}
              fill={fav ? "currentColor" : "none"}
            />
          </button>
        </div>

        {/* Details */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-[#2B1B14]">{product.name}</h1>

          <p className="text-2xl font-bold text-black">₹ {product.price}</p>

          <p className="text-gray-600">{product.description}</p>

          <p className="text-sm text-gray-500">
            Stock:{" "}
            <span className="font-semibold text-black">
              {product.countInStock > 0
                ? `In Stock (${product.countInStock})`
                : "Out of Stock"}
            </span>
          </p>

          {/* ✅ Buttons */}
          <div className="flex flex-col gap-3 mt-6">
            {/* ✅ Add To Cart */}
            <button
              disabled={product.countInStock === 0}
              onClick={handleAddToCart}
              className="w-full bg-[#2B1B14] text-white py-3 rounded-xl hover:bg-black disabled:opacity-50"
            >
              Add To Cart
            </button>

            {/* ✅ Shop Now */}
            <button
              disabled={product.countInStock === 0}
              onClick={handleShopNow}
              className="w-full bg-[#D4AF37] text-[#2B1B14] font-semibold py-3 rounded-xl hover:bg-[#B68D2C] disabled:opacity-50"
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
