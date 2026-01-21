import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function AdminEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
 

  // ✅ token
  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  const token = userInfo?.token;

  // ✅ categories list (must match filter exactly)
  const categories = [
    "Diamond",
    "Bridal",
    "Earrings",
    "Rings",
    "Bangles",
    "Anklets",
    "Wedding Rings",
    "Others",
  ];

  // ✅ form states
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [category, setCategory] = useState("Others");

  // ✅ loading states
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [updating, setUpdating] = useState(false);

  // ✅ fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const { data } = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );
        


        // ✅ Set form data
        setName(data?.name || "");
        setPrice(data?.price || "");
        setImage(data?.image || "");
        setDescription(data?.description || "");
        setCountInStock(data?.countInStock || 0);
        setCategory(data?.category || "Others");
      } catch (error) {
        toast.error(error?.response?.data?.message || "Product fetch failed");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // ✅ Upload image to cloudinary via backend
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      toast.loading("Uploading image...", { id: "upload" });

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

      setImage(data.imageUrl);
      toast.success("Image uploaded ✅", { id: "upload" });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Image upload failed", {
        id: "upload",
      });
    } finally {
      setUploading(false);
    }
  };

  // ✅ update handler
  const updateHandler = async (e) => {
    e.preventDefault();

    // ✅ validation
    if (!name || !price || !image || !category) {
      toast.error("Please fill all fields ✅");
      return;
    }

    try {
      setUpdating(true);
      toast.loading("Updating product...", { id: "update" });

      await axios.put(
        `http://localhost:5000/api/products/${id}`,
        {
          name,
          price,
          image,
          description,
          countInStock,
          category,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Product updated ✅", { id: "update" });
      navigate("/admin/products");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Update failed", {
        id: "update",
      });
    } finally {
      setUpdating(false);
    }
  };

  // ✅ loading UI
  if (loading) return <p className="p-5 text-center">Loading...</p>;

  return (
    <div className="p-5 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>

      <form onSubmit={updateHandler} className="space-y-3">
        {/* Name */}
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full border p-2 rounded-lg"
        />

        {/* Price */}
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          type="number"
          className="w-full border p-2 rounded-lg"
        />

        {/* Category */}
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

        {/* Upload Image */}
        <div className="border rounded-lg p-3">
          <label className="block text-sm font-medium mb-2">
            Change Image (Upload File)
          </label>

          <input type="file" onChange={uploadFileHandler} />

          {uploading && (
            <p className="text-sm text-blue-600 mt-2">Uploading...</p>
          )}
        </div>

        {/* Preview */}
        {image && (
          <div className="border rounded-xl p-3">
            <p className="text-sm text-green-700 font-medium">
              Image Preview ✅
            </p>
            <img
              src={image}
              alt="product"
              className="w-full h-56 object-cover rounded-xl mt-2"
            />
          </div>
        )}

        {/* Description */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          rows={4}
          className="w-full border p-2 rounded-lg"
        />

        {/* Stock */}
        <input
          value={countInStock}
          onChange={(e) => setCountInStock(Number(e.target.value))}
          placeholder="Stock"
          type="number"
          className="w-full border p-2 rounded-lg"
        />

        {/* Submit */}
        <button
          type="submit"
          disabled={uploading || updating}
          className="bg-black text-white px-5 py-2 rounded-lg w-full disabled:opacity-60"
        >
          {updating ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
}
