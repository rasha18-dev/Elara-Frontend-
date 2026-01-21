import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ReviewDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  // review form states
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);

  // page loading
  const [loading, setLoading] = useState(false);

  // ✅ SAFE localStorage parsing
  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  const token = userInfo?.token;

  // ✅ Fetch single product
  const fetchProduct = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `http://localhost:5000/api/products/${id}`
      );

      setProduct(data);
    } catch (error) {
      console.log("FETCH ERROR:", error?.response?.data || error.message);
      alert(error?.response?.data?.message || "Fetch failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  // ✅ Submit review
  const submitReview = async (e) => {
    e.preventDefault();

    if (!token) return alert("Please login to write a review!");
    if (!comment.trim()) return alert("Please enter comment!");

    try {
      setReviewLoading(true);

      const { data } = await axios.post(
        `http://localhost:5000/api/products/${id}/reviews`,
        { rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(data?.message || "Review added ✅");

      // refresh product after review submit
      await fetchProduct();

      setRating(5);
      setComment("");
    } catch (error) {
      console.log("REVIEW ERROR:", error?.response?.data || error.message);
      alert(error?.response?.data?.message || "Review failed");
    } finally {
      setReviewLoading(false);
    }
  };

  if (loading) return <p className="p-5 text-center">Loading...</p>;
  if (!product) return <p className="p-5 text-center">Product not found</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* ✅ Product Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="w-full">
          <img
            src={product?.image || "https://via.placeholder.com/600"}
            alt={product?.name || "product"}
            className="w-full h-[420px] object-cover rounded-2xl shadow"
          />
        </div>

        {/* Details */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product?.name}</h1>

          <p className="text-yellow-600 font-semibold text-lg">
            ⭐ {product?.rating ? product.rating.toFixed(1) : "0.0"}/5 (
            {product?.numReviews || 0} reviews)
          </p>

          <p className="text-2xl font-bold text-black">₹ {product?.price}</p>

          <p className="text-gray-600">{product?.description}</p>

          <p className="text-sm text-gray-500">
            Stock:{" "}
            <span className="font-semibold text-black">
              {product?.countInStock > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </p>

          <button
            disabled={product?.countInStock === 0}
            className="w-full md:w-[250px] bg-black text-white py-3 rounded-xl hover:bg-gray-900 disabled:opacity-50"
          >
            Add To Cart
          </button>
        </div>
      </div>

      {/* ✅ Reviews Section */}
      <div className="mt-14">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>

        {/* review list */}
        <div className="space-y-4">
          {product?.reviews?.length === 0 ? (
            <p className="text-gray-500">No reviews yet</p>
          ) : (
            product?.reviews?.map((review, index) => (
              <div
                key={review?._id || index}  // ✅ FIX: for Compass demo reviews
                className="border rounded-2xl p-4 bg-white shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <p className="font-semibold">{review?.name}</p>
                  <p className="text-yellow-600 font-semibold">
                    ⭐ {review?.rating}/5
                  </p>
                </div>

                <p className="text-gray-600 mt-2">{review?.comment}</p>

                <p className="text-xs text-gray-400 mt-2">
                  {review?.createdAt
                    ? new Date(review.createdAt).toLocaleDateString()
                    : ""}
                </p>
              </div>
            ))
          )}
        </div>

        {/* ✅ Add review form */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-2">Write a Review</h3>

          {!token && (
            <p className="text-red-600 mb-3 font-medium">
              Please login to submit review!
            </p>
          )}

          <form
            onSubmit={submitReview}
            className="border bg-gray-50 rounded-2xl p-5 space-y-4"
          >
            {/* Rating */}
            <div>
              <label className="block text-sm font-medium mb-1">Rating</label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full border p-2 rounded-xl"
              >
                <option value={5}>5 - Excellent</option>
                <option value={4}>4 - Good</option>
                <option value={3}>3 - Average</option>
                <option value={2}>2 - Bad</option>
                <option value={1}>1 - Very Bad</option>
              </select>
            </div>

            {/* Comment */}
            <div>
              <label className="block text-sm font-medium mb-1">Comment</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows="4"
                placeholder="Write your review..."
                className="w-full border p-2 rounded-xl"
              />
            </div>

            <button
              disabled={reviewLoading || !token}
              className="bg-black text-white w-full py-3 rounded-xl hover:bg-gray-900 disabled:opacity-50"
            >
              {reviewLoading ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
