import { useState } from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { isValidPhone } from "../utils/validators";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

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

      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const token = userInfo?.token;

      if (!token) {
        toast.warning("Please login first");
        navigate("/login");
        return;
      }

      // ✅ Prepare order items for backend
      const orderItems = cartItems.map((item) => ({
        product: item._id,
        name: item.name,
        image: item.image,
        price: item.price,
        qty: item.qty,
      }));

      // ✅ 1) Save COD order in DB
      const res = await axios.post(
        "http://localhost:5000/api/orders",
        {
          orderItems,
          shippingAddress: { name, phone, address },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success(res.data.message || "Order Confirmed ✅");

      // ✅ 2) Open WhatsApp message
      const adminNumber = "919876543210"; // ✅ YOUR WhatsApp number

      const itemsText = cartItems
        .map(
          (item, i) =>
            `${i + 1}. ${item.name} | Qty: ${item.qty} | Price: ₹${item.price}`
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
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">Checkout</h1>

      {/* CART ITEMS */}
      <div className="bg-white rounded-3xl shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-500">No items</p>
        ) : (
          <div className="space-y-3">
            {cartItems.map((item) => (
              <div key={item._id} className="flex justify-between border-b pb-2">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    Qty: {item.qty} × ₹{item.price}
                  </p>
                </div>
                <p className="font-bold">₹ {item.qty * item.price}</p>
              </div>
            ))}
          </div>
        )}

        <p className="text-xl font-bold mt-4">Total: ₹ {total}</p>
      </div>

      {/* DELIVERY DETAILS */}
      <div className="bg-white rounded-3xl shadow p-6 space-y-4">
        <h2 className="text-lg font-semibold">Delivery Details</h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          className="w-full border px-4 py-3 rounded-xl outline-none"
        />

        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone Number"
          className="w-full border px-4 py-3 rounded-xl outline-none"
        />

        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Full Address"
          className="w-full border px-4 py-3 rounded-xl outline-none"
        />

        <button
          onClick={placeOrderHandler}
          disabled={cartItems.length === 0}
          className="w-full bg-black text-white py-3 rounded-full font-semibold disabled:bg-gray-300"
        >
          Place Order (COD) ✅
        </button>

        <p className="text-sm text-gray-500 text-center">
          After placing order, WhatsApp opens with order confirmation message.
        </p>
      </div>
    </div>
  );
}
