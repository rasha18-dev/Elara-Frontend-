import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const navigate = useNavigate();

  const { cartItems, removeFromCart, updateQty } = useCart();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div>
          <p className="text-gray-600">Cart is empty</p>

          <Link to="/products" className="text-[#b68d2c] font-semibold">
            Continue shopping →
          </Link>
        </div>
      ) : (
        <>
          {/* ✅ CART ITEMS */}
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-3xl shadow p-4 flex gap-4 items-center"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 rounded-2xl object-cover"
                />

                <div className="flex-1">
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-gray-600">₹ {item.price}</p>
                </div>

                {/* ✅ QTY (- / +) */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      updateQty(item._id, Math.max(Number(item.qty) - 1, 1))
                    }
                    disabled={Number(item.qty) <= 1}
                    className="w-10 h-10 rounded-xl border font-bold disabled:opacity-50"
                  >
                    -
                  </button>

                  <span className="min-w-[40px] text-center font-semibold">
                    {item.qty}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      updateQty(item._id, Math.min(Number(item.qty) + 1, 10))
                    }
                    disabled={Number(item.qty) >= 10}
                    className="w-10 h-10 rounded-xl border font-bold disabled:opacity-50"
                  >
                    +
                  </button>
                </div>

                {/* ✅ REMOVE */}
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-600 font-semibold"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* ✅ TOTAL + CHECKOUT */}
          <div className="mt-8 bg-white rounded-3xl shadow p-6">
            <h2 className="text-xl font-semibold">Total: ₹ {total}</h2>

            <button
              onClick={() => navigate("/checkout")}
              className="mt-4 w-full bg-black text-white py-3 rounded-full font-semibold"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
