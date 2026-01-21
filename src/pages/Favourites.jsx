import { Link } from "react-router-dom";
import { useFav } from "../context/FavouriteContext";
import { HeartOff } from "lucide-react";
import { toast } from "react-toastify";

export default function Favourites() {
  const { favItems, removeFromFav } = useFav();

  const handleRemove = (id) => {
    removeFromFav(id);
    toast.info("Removed from favourites ❤️");
  };

  if (!favItems || favItems.length === 0) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold">No favourites yet ❤️</h2>
        <Link
          to="/products"
          className="mt-4 px-6 py-2 bg-black text-white rounded-xl"
        >
          Go Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 max-w-6xl mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">My Favourites ❤️</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {favItems.map((product) => (
          <div key={product._id} className="bg-white rounded-2xl shadow p-4">
            <Link to={`/product/${product._id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-56 object-cover rounded-xl"
              />
            </Link>

            <h2 className="mt-3 font-semibold">{product.name}</h2>
            <p className="mt-1 font-bold">₹ {product.price}</p>

            <button
              onClick={() => handleRemove(product._id)}
              className="mt-4 w-full flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-xl hover:opacity-90"
            >
              <HeartOff size={18} /> Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
