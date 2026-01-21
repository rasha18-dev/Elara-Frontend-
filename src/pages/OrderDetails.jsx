import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  const token = userInfo?.token;

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchOrder = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(`http://localhost:5000/api/orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setOrder(data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Order fetch failed ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      toast.warning("Please login first");
      navigate("/login");
    } else {
      fetchOrder();
    }
    // eslint-disable-next-line
  }, [token, id]);

  if (loading) return <p className="pt-24 text-center">Loading...</p>;
  if (!order) return <p className="pt-24 text-center">Order not found</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 pt-24">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#2B1B14]">
          Order Details #{order._id.slice(-6)}
        </h1>

        <Link to="/my-orders" className="text-[#D4AF37] font-semibold hover:underline">
          ← Back
        </Link>
      </div>

      <div className="bg-white border rounded-3xl shadow p-6 space-y-6">
        {/* Delivery */}
        <div className="flex justify-between">
          <p className="font-semibold">Delivery Status</p>
          {order.isDelivered ? (
            <span className="text-green-700 font-semibold">Delivered ✅</span>
          ) : (
            <span className="text-orange-600 font-semibold">Pending ⏳</span>
          )}
        </div>

        {/* Shipping Address */}
        <div>
          <h2 className="font-bold mb-2">Shipping Address</h2>
          <p className="text-sm text-gray-700">Name: {order.shippingAddress?.name}</p>
          <p className="text-sm text-gray-700">Phone: {order.shippingAddress?.phone}</p>
          <p className="text-sm text-gray-700">Address: {order.shippingAddress?.address}</p>
        </div>

        {/* Items */}
        <div>
          <h2 className="font-bold mb-3">Items</h2>
          <div className="space-y-3">
            {order.orderItems?.map((item) => (
              <div key={item._id} className="flex justify-between border-b pb-2">
                <div className="flex gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded-xl border"
                  />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      Qty: {item.qty} × ₹{item.price}
                    </p>
                  </div>
                </div>
                <p className="font-bold">₹ {item.qty * item.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className="flex justify-between text-lg font-bold">
          <p>Total</p>
          <p>₹ {order.totalPrice}</p>
        </div>
      </div>
    </div>
  );
}
