import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function HomeReviews() {
  const [latestReviews, setLatestReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchReviews = async () => {
    try {
      setLoading(true);

      // ✅ get all products
      const { data: products } = await axios.get(
        "http://localhost:5000/api/products"
      );

      // ✅ collect all reviews from all products
      const allReviews = [];
      products.forEach((p) => {
        (p.reviews || []).forEach((r) => {
          allReviews.push({
            ...r,
            productId: p._id,
            productName: p.name,
            productImage: p.image,
          });
        });
      });

      // ✅ sort newest first
      allReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      // ✅ show only latest 6 reviews
      setLatestReviews(allReviews.slice(0, 6));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-14">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Latest Reviews</h2>
        <p className="text-gray-500 text-sm">Customer feedback</p>
      </div>

      {loading ? (
        <p className="text-center">Loading reviews...</p>
      ) : latestReviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestReviews.map((review) => (
            <div
              key={review._id}
              className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-3">
                <img
                  src={review.productImage || "https://via.placeholder.com/60"}
                  alt={review.productName}
                  className="w-14 h-14 rounded-xl object-cover"
                />

                <div>
                  <Link
                    to={`/product/${review.productId}`}
                    className="font-semibold text-black hover:underline"
                  >
                    {review.productName}
                  </Link>
                  <p className="text-sm text-gray-500">{review.name}</p>
                </div>
              </div>

             

              <p className="text-gray-700 mt-2 line-clamp-3">{review.comment}</p>

              <p className="text-xs text-gray-400 mt-3">
                {review.createdAt
                  ? new Date(review.createdAt).toLocaleDateString()
                  : ""}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
