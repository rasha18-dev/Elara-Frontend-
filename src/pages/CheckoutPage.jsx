import { useState } from "react";
import { useCart } from "../context/CartContext";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { isValidPhone } from "../utils/validators";
import { ArrowLeft, Truck, MapPin, Phone, User, CheckCircle, Lock } from "lucide-react";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const subtotal = cartItems.reduce(
  (sum, item) => sum + (item.productId?.price || 0) * item.qty,
  0
);

  const shipping = subtotal > 5000 ? 0 : 250;
  const total = subtotal + shipping;

  const placeOrderHandler = async () => {
    try {
      if (cartItems.length === 0) {
        toast.warning("Cart is empty!");
        return;
      }

      if (!name || !phone || !address) {
        toast.warning("Please fill Name, Phone, Address");
        return;
      }

      // ✅ Phone validation
      if (!isValidPhone(phone)) {
        toast.warning("Enter valid 10 digit phone number");
        return;
      }

      setLoading(true);

      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const token = userInfo?.token;

      if (!token) {
        toast.warning("Please login first");
        navigate("/login");
        return;
      }

      // ✅ Prepare order items for backend
      const orderItems = cartItems.map((item) => ({
  product: item.productId?._id,
  name: item.productId?.name,
  image: item.productId?.image,
  price: item.productId?.price,
  qty: item.qty,
}));


      // ✅ 1) Save COD order in DB
    const { clearCart } = useCart();
      toast.success(res.data.message || "Order Confirmed ✅");
      // ✅ clear backend cart
await axios.delete("/cart", {
  headers: { Authorization: `Bearer ${token}` },
});

// ✅ clear frontend cart
clearCart();

// ✅ clear local storage (if used)
localStorage.removeItem("cartItems");


      // ✅ 2) Open WhatsApp message
      const adminNumber = "919876543210"; // ✅ YOUR WhatsApp number

      const itemsText = cartItems
        .map(
          (item, i) =>
            `${i + 1}. ${item.productId?.name} | Qty: ${item.qty} | Price: ₹${item.productId?.price}`

        )
        .join("\n");

      const message = `✅ YOUR ORDER IS CONFIRMED - ELARA ✅

👤 Name: ${name}
📞 Phone: ${phone}
🏠 Address: ${address}

🛍 Items:
${itemsText}

💰 Total Amount: ₹${total}

🧾 Order ID: ${res.data?.order?._id || "N/A"}

Thank you for shopping with ELARA ❤️`;

      window.open(
        `https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`,
        "_blank"
      );

      // ✅ 3) Clear cart after order
      clearCart();
      navigate("/");
    } catch (error) {
      console.log("ORDER ERROR:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Order failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/cart")}
          className="flex items-center gap-2 text-[#2B1B14] hover:text-[#D4AF37] transition mb-8 font-semibold"
        >
          <ArrowLeft size={20} />
          Back to Cart
        </button>

        <h1 className="text-4xl md:text-5xl font-bold text-[#2B1B14] mb-10">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            {/* Delivery Details Section */}
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden mb-8">
              <div className="bg-gradient-to-r from-[#2B1B14] to-[#4A2F25] text-white p-8">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <Truck size={28} />
                  Delivery Information
                </h2>
              </div>

              <div className="p-8 space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-[#2B1B14] mb-2 flex items-center gap-2">
                    <User size={18} className="text-[#D4AF37]" />
                    Full Name
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37] focus:ring-opacity-20 transition"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-[#2B1B14] mb-2 flex items-center gap-2">
                    <Phone size={18} className="text-[#D4AF37]" />
                    Phone Number
                  </label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter 10 digit phone number"
                    className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37] focus:ring-opacity-20 transition"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-semibold text-[#2B1B14] mb-2 flex items-center gap-2">
                    <MapPin size={18} className="text-[#D4AF37]" />
                    Full Address
                  </label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your complete delivery address"
                    rows="4"
                    className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37] focus:ring-opacity-20 transition resize-none"
                  />
                </div>

                {/* Payment Method Info */}
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <Lock className="inline-block mr-2" size={16} />
                    <strong>Cash on Delivery (COD)</strong> - Pay when your order arrives
                  </p>
                </div>
              </div>
            </div>

            {/* Order Summary Section */}
            <div className="bg-white rounded-3xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-[#2B1B14] mb-6">Order Items</h3>

              {cartItems.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No items in cart</p>
              ) : (
                <div className="space-y-4">
                 {cartItems.map((item, index) => (
  <div
    key={item.productId?._id || index}
    className={`flex gap-4 pb-4 ${
      index !== cartItems.length - 1 ? "border-b" : ""
    }`}
  >
    <img
      src={item.productId?.image}
      alt={item.productId?.name}
      className="w-20 h-20 rounded-lg object-cover"
    />

    <div className="flex-1">
      <p className="font-bold text-[#2B1B14]">
        {item.productId?.name}
      </p>
      <p className="text-sm text-gray-600">Qty: {item.qty}</p>
    </div>

    <div className="text-right">
      <p className="font-bold text-[#D4AF37]">
        ₹ {((item.productId?.price || 0) * item.qty).toLocaleString()}
      </p>
    </div>
  </div>
))}

                </div>
              )}
            </div>
          </div>

          {/* Price Summary & Place Order */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-lg p-8 sticky top-20">
              <h3 className="text-2xl font-bold text-[#2B1B14] mb-6">Price Summary</h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-[#2B1B14]">₹ {subtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Shipping {shipping === 0 ? "(Free)" : ""}
                  </span>
                  <span className="font-semibold text-[#2B1B14]">
                    {shipping === 0 ? "FREE" : `₹ ${shipping}`}
                  </span>
                </div>

                {shipping > 0 && (
                  <p className="text-xs text-gray-500 bg-blue-50 p-2 rounded">
                    Free shipping on orders above ₹5000
                  </p>
                )}

                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-[#2B1B14]">Total</span>
                    <span className="text-2xl font-bold text-[#D4AF37]">₹ {total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={placeOrderHandler}
                disabled={cartItems.length === 0 || loading}
                className="w-full bg-gradient-to-r from-[#2B1B14] to-[#4A2F25] text-white py-4 rounded-xl font-bold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition transform hover:scale-105 active:scale-95 mb-3 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle size={20} />
                    Place Order
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center bg-green-50 p-3 rounded-lg">
                ✓ WhatsApp confirmation will be sent after order placement
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
