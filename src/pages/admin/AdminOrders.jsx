import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function AdminOrders() {
  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  const token = userInfo?.token;

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch all orders (Admin)
  const fetchOrders = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get("http://localhost:5000/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setOrders(data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Orders fetch failed ❌");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Mark Delivered
  const markDeliveredHandler = async (orderId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/orders/${orderId}/deliver`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Order marked as Delivered ✅");

      // refresh list
      fetchOrders();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Update failed ❌");
    }
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6 text-[#2B1B14]">Admin Orders</h1>

      {loading && <p>Loading...</p>}

      {!loading && orders.length === 0 && (
        <p className="text-gray-500">No orders found</p>
      )}

      <div className="space-y-4">
        {orders.map((o) => (
          <div
            key={o._id}
            className="bg-white border rounded-2xl shadow p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            {/* Order */}
            <div>
              <p className="font-semibold text-[#2B1B14]">
                Order #{o._id.slice(-6)}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(o.createdAt).toLocaleDateString()}
              </p>

              <p className="text-sm text-gray-700 mt-1">
                User: <span className="font-semibold">{o.user?.name}</span>
              </p>
            </div>

            {/* Total */}
            <div className="font-bold text-[#2B1B14]">₹ {o.totalPrice}</div>

            {/* Status */}
            <div>
              {o.isDelivered ? (
                <span className="text-green-700 font-semibold text-sm">
                  Delivered ✅
                </span>
              ) : (
                <span className="text-orange-600 font-semibold text-sm">
                  Pending ⏳
                </span>
              )}
            </div>

            {/* Button */}
            <div className="flex gap-2">
              {!o.isDelivered && (
                <button
                  onClick={() => markDeliveredHandler(o._id)}
                  className="px-4 py-2 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition"
                >
                  Mark Delivered ✅
                </button>
              )}

              {o.isDelivered && (
                <button
                  disabled
                  className="px-4 py-2 rounded-xl bg-gray-200 text-gray-500 font-semibold cursor-not-allowed"
                >
                  Already Delivered
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
