import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ShopHome() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="bg-ivory min-h-screen px-6 py-10">
      <h2 className="text-3xl font-luxury text-softBrown text-center mb-10">
        New Arrivals ✨
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((p) => (
          <Link
            to={`/product/${p._id}`}
            key={p._id}
            className="bg-white rounded-3xl shadow hover:shadow-lg transition overflow-hidden"
          >
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-64 object-cover"
            />

            <div className="p-4">
              <h3 className="font-semibold text-mocha">{p.name}</h3>
              <p className="text-antiqueGold font-bold mt-2">₹ {p.price}</p>
              <p className="text-xs text-gray-500 mt-1">{p.category}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
