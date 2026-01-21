import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const [productsCount, setProductsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [lowStockCount, setLowStockCount] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const token = userInfo?.token;

        if (!token) return alert("Token missing. Please login again.");

        // ✅ fetch products
        const productsRes = await axios.get("http://localhost:5000/api/products");

        const products = productsRes.data || [];
        setProductsCount(products.length);

        // ✅ low stock calculation
        const lowStock = products.filter((p) => (p.countInStock || 0) <= 5);
        setLowStockCount(lowStock.length);

        // ✅ fetch orders (admin only)
        const ordersRes = await axios.get("http://localhost:5000/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const orders = ordersRes.data || [];
        setOrdersCount(orders.length);

        // ✅ revenue (COD revenue = sum of totalPrice)
        const totalRevenue = orders.reduce(
          (sum, o) => sum + (o.totalPrice || 0),
          0
        );
        setRevenue(totalRevenue);

        // ✅ recent orders
        setRecentOrders(orders.slice(0, 5));
      } catch (error) {
        console.log("ADMIN DASHBOARD ERROR:", error.response?.data || error.message);
        alert(error.response?.data?.message || "Dashboard fetch failed");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <p className="p-6">Loading Dashboard...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Admin Dashboard</h1>

      {/* ✅ Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl shadow p-6">
          <p className="text-gray-500">Total Products</p>
          <h2 className="text-3xl font-bold mt-2">{productsCount}</h2>
          <Link
            to="/admin/products"
            className="text-[#b68d2c] font-semibold inline-block mt-4"
          >
            Manage Products →
          </Link>
        </div>

        <div className="bg-white rounded-3xl shadow p-6">
          <p className="text-gray-500">Total Orders</p>
          <h2 className="text-3xl font-bold mt-2">{ordersCount}</h2>
          <p className="text-sm text-gray-400 mt-4">COD Orders</p>
        </div>

        <div className="bg-white rounded-3xl shadow p-6">
          <p className="text-gray-500">Revenue</p>
          <h2 className="text-3xl font-bold mt-2">₹ {revenue}</h2>
          <p className="text-sm text-gray-400 mt-4">
            Total COD revenue (all orders)
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow p-6">
          <p className="text-gray-500">Low Stock</p>
          <h2 className="text-3xl font-bold mt-2">{lowStockCount}</h2>
          <p className="text-sm text-gray-400 mt-4">Stock ≤ 5</p>
        </div>
      </div>

      {/* ✅ Recent Orders Table */}
      <div className="bg-white rounded-3xl shadow p-6 mt-8">
        <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>

        {recentOrders.length === 0 ? (
          <p className="text-gray-500">No orders yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="py-2">Order ID</th>
                  <th className="py-2">User</th>
                  <th className="py-2">Total</th>
                  <th className="py-2">Payment</th>
                  <th className="py-2">Date</th>
                </tr>
              </thead>

              <tbody>
                {recentOrders.map((o) => (
                  <tr key={o._id} className="border-b">
                    <td className="py-2">{o._id.slice(-6)}</td>
                    <td className="py-2">{o.user?.name || "Guest"}</td>
                    <td className="py-2 font-semibold">₹ {o.totalPrice}</td>
                    <td className="py-2">
                      <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-semibold">
                        COD
                      </span>
                    </td>
                    <td className="py-2">
                      {new Date(o.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
