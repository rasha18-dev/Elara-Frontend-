import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Screen size (only render ONE layout)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // ✅ SAFE localStorage parsing
  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  const token = userInfo?.token;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch products ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ Update Stock
  const updateStock = async (id, newStock) => {
    try {
      await axios.put(
        `http://localhost:5000/api/products/${id}`,
        { countInStock: Number(newStock) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Stock updated ✅");
      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Stock update failed ❌");
    }
  };

  const increaseStock = (p) => updateStock(p._id, (p.countInStock || 0) + 1);
  const decreaseStock = (p) =>
    updateStock(p._id, Math.max((p.countInStock || 0) - 1, 0));

  // ✅ Delete
  const deleteHandler = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      setLoading(true);

      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Product deleted ✅");
      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link
          to="/admin/products/add"
          className="bg-black text-white px-5 py-2 rounded-full font-semibold"
        >
          + Add Product
        </Link>
      </div>

      {loading && <p className="text-gray-500 mb-4">Loading...</p>}

      {products.length === 0 && !loading && (
        <p className="text-center text-gray-500 py-10">No products found.</p>
      )}

      {/* ================= MOBILE ================= */}
      {isMobile && (
        <div className="space-y-4">
          {products.map((p) => (
            <div key={p._id} className="bg-white rounded-2xl shadow border p-4">
              <div className="flex gap-4">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-20 h-20 rounded-xl object-cover border"
                />

                <div className="flex-1">
                  <p className="font-semibold text-lg">{p.name}</p>
                  <p className="text-sm text-gray-600">₹ {p.price}</p>

                  <p className="text-sm mt-2">
                    Stock:{" "}
                    <span className="font-bold">
                      {p.countInStock > 0 ? p.countInStock : "Out of Stock"}
                    </span>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4">
                <button
                  onClick={() => decreaseStock(p)}
                  className="px-4 py-2 rounded-full bg-[#2B1B14] text-white"
                >
                  Stock -
                </button>

                <button
                  onClick={() => increaseStock(p)}
                  className="px-4 py-2 rounded-full bg-[#2B1B14] text-white"
                >
                  Stock +
                </button>

                <Link
                  to={`/admin/products/${p._id}/edit`}
                  className="px-4 py-2 rounded-full bg-[#D4AF37] text-[#2B1B14] font-semibold"
                >
                  Edit
                </Link>

                <button
                  onClick={() => deleteHandler(p._id)}
                  className="px-4 py-2 rounded-full bg-red-600 text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= DESKTOP ================= */}
      {!isMobile && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3">Image</th>
                <th className="p-3">Name</th>
                <th className="p-3">Price</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="border-b">
                  <td className="p-3">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-14 h-14 rounded-xl object-cover"
                    />
                  </td>

                  <td className="p-3 font-medium">{p.name}</td>
                  <td className="p-3">₹ {p.price}</td>

                  <td className="p-3">
                    {(p.countInStock || 0) === 0
                      ? "Out of Stock"
                      : `${p.countInStock} left`}
                  </td>

                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => decreaseStock(p)}
                        className="px-4 py-2 rounded-full bg-gray-800 text-white"
                      >
                        Stock -
                      </button>

                      <button
                        onClick={() => increaseStock(p)}
                        className="px-4 py-2 rounded-full bg-green-600 text-white"
                      >
                        Stock +
                      </button>

                      <Link
                        to={`/admin/products/${p._id}/edit`}
                        className="px-4 py-2 rounded-full bg-[#d4af37] text-white"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => deleteHandler(p._id)}
                        className="px-4 py-2 rounded-full bg-red-600 text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
