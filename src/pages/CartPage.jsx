import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const navigate = useNavigate(); // ✅ FIXED

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

                {/* ✅ QTY */}
                <select
                  value={item.qty}
                  onChange={(e) => updateQty(item._id, e.target.value)}
                  className="border rounded-xl px-3 py-2"
                >
                  {[...Array(10).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>

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
              onClick={() => navigate("/checkout")} // ✅ FIXED
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
