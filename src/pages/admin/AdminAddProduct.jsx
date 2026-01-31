import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function AdminAddProduct() {
  const navigate = useNavigate();

  // ✅ Categories list (must match filter exactly)
  const categories = [
    "Diamond",
    "Bridal",
    "Earrings",
    "Rings",
    "Bangles",
    "Anklets",
    "Wedding Rings",
    "Necklace",
  ];

  // form states
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("");
  const [image, setImage] = useState(""); // ✅ cloudinary URL
  const [description, setDescription] = useState("");
  const [countInStock, setCountInStock] = useState(0);

  // ✅ category state
  const [category, setCategory] = useState("Rings");

  // upload loading
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  // token
  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  const token = userInfo?.token;

  // ✅ Upload file handler (File -> Cloudinary -> URL)
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);

      const { data } = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setImage(data.imageUrl); // ✅ Cloudinary URL
    } catch (error) {
      console.log("UPLOAD ERROR:", error?.response?.data || error.message);
      toast.error(error?.response?.data?.message || "Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  // ✅ Submit product
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!name || !price || !weight || !description || !image || !category) {
      return alert("Please fill all fields + upload image ✅");
    }

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:5000/api/products",
        {
          name,
          price,
          weight,
          description,
          image,
          category,
          countInStock,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Product created ✅");
      navigate("/admin/products");
    } catch (error) {
      console.log("CREATE ERROR:", error?.response?.data || error.message);
      toast.error(error?.response?.data?.message || "Product create failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-5">Add New Product</h2>

      <form onSubmit={submitHandler} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block font-semibold mb-1">Product Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter product name"
            className="w-full border p-2 rounded-lg"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block font-semibold mb-1">Price</label>
          <input
            value={price}
            type="number"
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter product price"
            className="w-full border p-2 rounded-lg"
          />
        </div>
<input
  type="text"
  placeholder="Weight (eg: 500g / 1kg)"
  value={weight}
  onChange={(e) => setWeight(e.target.value)}
  className="w-full border rounded-xl px-4 py-2"
/>

        {/* ✅ Category Dropdown (fixed) */}
        <div>
          <label className="block font-semibold mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border p-2 rounded-lg"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* ✅ Upload Image */}
        <div className="border rounded-lg p-4">
          <label className="block font-semibold mb-2">Upload Image</label>
          <input type="file" onChange={uploadFileHandler} />

          {uploading && (
            <p className="text-blue-600 text-sm mt-2">Uploading...</p>
          )}

          {image && (
            <div className="mt-3">
              <p className="text-green-700 font-medium text-sm">
                Uploaded Image ✅
              </p>
              <img
                src={image}
                alt="preview"
                className="w-full h-56 object-cover rounded-xl mt-2"
              />
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            value={description}
            rows={4}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter product description"
            className="w-full border p-2 rounded-lg"
          />
        </div>

        {/* Stock */}
        <div>
          <label className="block font-semibold mb-1">Stock Count</label>
          <input
            value={countInStock}
            type="number"
            onChange={(e) => setCountInStock(Number(e.target.value))}
            className="w-full border p-2 rounded-lg"
          />
        </div>

        {/* Submit */}
        <button
          disabled={loading || uploading}
          className="bg-black text-white py-3 w-full rounded-xl hover:bg-gray-900 disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
}
