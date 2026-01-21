import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function MyOrders() {
  const navigate = useNavigate();

  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  const token = userInfo?.token;

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get("http://localhost:5000/api/orders/my", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setOrders(data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Orders fetch failed ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      toast.warning("Please login first");
      navigate("/login");
    } else {
      fetchOrders();
    }
    // eslint-disable-next-line
  }, [token]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6 text-[#2B1B14]">My Orders</h1>

      {loading && <p>Loading...</p>}

      {!loading && orders.length === 0 && (
        <p className="text-gray-500">No orders yet</p>
      )}

      <div className="space-y-4">
        {orders.map((o) => (
          <div
            key={o._id}
            className="bg-white border rounded-2xl shadow p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div>
              <p className="font-semibold text-[#2B1B14]">
                Order #{o._id.slice(-6)}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(o.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="font-bold text-[#2B1B14]">₹ {o.totalPrice}</div>

            <div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#D4AF37]/20 text-[#2B1B14]">
                COD
              </span>
            </div>

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

            <Link
              to={`/order/${o._id}`}
              className="text-[#D4AF37] font-semibold hover:text-[#B68D2C]"
            >
              View →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
