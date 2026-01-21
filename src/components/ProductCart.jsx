import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden">
      {/* Image */}
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image || "https://via.placeholder.com/400"}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
      </Link>

      {/* Content */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 line-clamp-1">
          {product.name}
        </h2>

        <p className="text-yellow-600 font-semibold mt-1">
          ⭐ {product.rating ? product.rating.toFixed(1) : "0.0"} (
          {product.numReviews || 0})
        </p>

        <p className="text-xl font-bold mt-2">₹ {product.price}</p>

        <p className="text-sm text-gray-500 mt-1">
          {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
        </p>

        {/* Buttons */}
        <div className="flex gap-3 mt-4">
          {/* ✅ Product Details Link */}
          <Link
            to={`/product/${product._id}`}
            className="flex-1 text-center bg-black text-white py-2 rounded-xl hover:bg-gray-900"
          >
            View
          </Link>

          {/* Add to cart button */}
          <button
            disabled={product.countInStock === 0}
            className="flex-1 bg-yellow-500 text-black py-2 rounded-xl font-semibold hover:bg-yellow-400 disabled:opacity-50"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
