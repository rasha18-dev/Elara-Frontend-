import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Trash2, ShoppingBag, ArrowLeft } from "lucide-react";

export default function CartPage() {
  const navigate = useNavigate();
  const { cartItems = [], removeFromCart } = useCart();

  // ✅ Normalize item (works for guest + DB cart)
  const getItem = (item) => item.productId || item;

  const total = (cartItems || []).reduce((sum, item) => {
    const p = getItem(item);
    const price = Number(p?.price || 0);
    const qty = Number(item.qty || 1);
    return sum + price * qty;
  }, 0);

  const subtotal = total;
  const shipping = total > 0 ? (total > 5000 ? 0 : 250) : 0;
  const finalTotal = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/products")}
            className="flex items-center gap-2 text-[#2B1B14] hover:text-[#D4AF37] transition mb-4"
          >
            <ArrowLeft size={20} />
            Continue Shopping
          </button>

          <h1 className="text-4xl md:text-5xl font-bold text-[#2B1B14]">
            Shopping Cart
          </h1>

          <p className="text-gray-600 mt-2">
            {cartItems.length} item(s) in your cart
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-600 text-lg mb-4">Your cart is empty</p>
            <Link
              to="/products"
              className="inline-block px-8 py-3 bg-[#2B1B14] text-white rounded-full font-semibold hover:bg-black transition"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
                {cartItems.map((item, index) => {
                  const p = getItem(item);

                  return (
                    <div
                      key={item._id}
                      className={`p-6 flex gap-6 items-center ${
                        index !== cartItems.length - 1 ? "border-b" : ""
                      }`}
                    >
                      {/* Image */}
                      <img
                        src={p?.image}
                        alt={p?.name}
                        className="w-28 h-28 rounded-2xl object-cover shadow-md"
                      />

                      {/* Details */}
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-[#2B1B14]">
                          {p?.name}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">
                          Category: {p?.category}
                        </p>
                        <p className="text-[#D4AF37] font-bold text-lg mt-2">
                          ₹ {p?.price}
                        </p>
                      </div>

                      {/* Subtotal */}
                      <div className="text-right min-w-[100px]">
                        <p className="text-sm text-gray-600">Subtotal</p>
                        <p className="text-[#2B1B14] font-bold text-lg">
                          ₹ {(Number(p?.price || 0) * Number(item.qty || 1)).toLocaleString()}
                        </p>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Summary */}
            <div>
              <div className="bg-white rounded-3xl shadow-lg p-8 sticky top-20">
                <h2 className="text-2xl font-bold text-[#2B1B14] mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹ {subtotal.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "FREE" : `₹ ${shipping}`}</span>
                  </div>

                  <div className="border-t pt-4 flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-[#D4AF37] text-xl">
                      ₹ {finalTotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full bg-[#2B1B14] text-white py-4 rounded-xl font-bold hover:opacity-90"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
