import { Link } from "react-router-dom";
import { useFav } from "../context/FavouriteContext";
import { HeartOff, ShoppingBag, ArrowRight } from "lucide-react";
import { toast } from "react-toastify";

export default function Favourites() {
  const { favs, removeFromFav } = useFav(); // ✅ use favs

  const handleRemove = (id) => {
    removeFromFav(id);
    toast.info("Removed from favourites ❤️");
  };

  if (!favs || favs.length === 0) {   // ✅ favs
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center bg-[#F9F6F0] px-4">
        <div className="w-24 h-24 bg-[#B08D55]/10 rounded-full flex items-center justify-center mb-6">
          <HeartOff size={48} className="text-[#B08D55]/40" />
        </div>
        <h2 className="text-3xl font-luxury text-[#5D4037] mb-3">Your wishlist is empty</h2>
        <p className="text-[#5D4037]/60 text-center max-w-md mb-8">
          Curate your personal collection of exclusive pieces. Save items you love here for later.
        </p>
        <Link
          to="/products"
          className="group flex items-center gap-3 px-8 py-4 bg-[#121212] text-white rounded-sm text-sm font-bold uppercase tracking-widest hover:bg-[#B08D55] transition-colors duration-300 shadow-lg"
        >
          <span>Explore Collection</span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F6F0] pt-32 pb-16 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 border-b border-[#B08D55]/20 pb-6">
          <div>
            <p className="text-[#B08D55] text-xs font-bold uppercase tracking-[0.2em] mb-2">My Collection</p>
            <h1 className="text-4xl md:text-5xl font-luxury text-[#5D4037]">Wishlist</h1>
          </div>
          <p className="text-[#5D4037]/60 text-sm mt-4 md:mt-0 font-medium">
            {favs.length} {favs.length === 1 ? 'Item' : 'Items'} Saved
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {favs.map((product) => (   // ✅ favs
            <div key={product._id} className="group bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 border border-[#E5E5E5] hover:border-[#B08D55]/30">

              {/* Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                <Link to={`/product/${product._id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>

                {/* Remove Button (Floating) */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleRemove(product._id);
                  }}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-red-500 shadow-lg hover:bg-red-500 hover:text-white transition-all duration-300 z-10 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                  title="Remove from Wishlist"
                >
                  <HeartOff size={18} />
                </button>
              </div>

              {/* Details */}
              <div className="p-6">
                <div className="mb-4">
                  <h2 className="text-lg font-luxury text-[#121212] mb-1 truncate">{product.name}</h2>
                  <p className="text-[#D4AF37] font-semibold">₹ {product.price.toLocaleString()}</p>
                </div>

                <div className="flex gap-3">
                  <Link
                    to={`/product/${product._id}`}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#121212] text-white py-3 text-xs font-bold uppercase tracking-wider hover:bg-[#B08D55] transition-colors duration-300"
                  >
                    <ShoppingBag size={14} />
                    View Product
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
