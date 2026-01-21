import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { isValidPhone } from "../utils/validators";
export default function CustomizationPage() {
  // ✅ Admin WhatsApp number (Country code + number, no +)
  const adminWhatsApp = "7736952028"; // ✅ change to your number

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    type: "",
    metal: "",
    budget: "",
    details: "",
  });

  const [refImage, setRefImage] = useState(""); // ✅ cloudinary url
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Upload reference image to cloudinary (via your backend /api/upload)
  const uploadReferenceImage = async (e) => {
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
          },
        }
      );

      setRefImage(data.imageUrl); // ✅ url from backend
      toast.success("Reference image uploaded ✅");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Image upload failed ❌");
    } finally {
      setUploading(false);
    }
  };

  // ✅ Submit → WhatsApp
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.type || !form.details) {
      toast.warning("Please fill required fields ✅");
      return;
    }
    if (!isValidPhone(form.phone)) {
    toast.warning("Enter valid 10 digit phone number");
    return;
  }


    const message = `✨ Custom Jewellery Request ✨

👤 Name: ${form.name}
📞 Phone: ${form.phone}
📧 Email: ${form.email}

💍 Jewellery Type: ${form.type}
🔩 Metal: ${form.metal}
💰 Budget: ₹${form.budget}

📝 Design Details:
${form.details}

📸 Reference Image:
${refImage ? refImage : "Not uploaded"}
`;

    const url = `https://wa.me/${adminWhatsApp}?text=${encodeURIComponent(
      message
    )}`;

    toast.success("Opening WhatsApp... ✅");
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-ivory">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-luxury text-mocha">
            Custom Jewellery
          </h1>
          <p className="mt-4 text-mocha/70">
            Submit your idea and reference image ✨ we’ll contact you on WhatsApp
          </p>
        </div>

        <div className="bg-white/70 backdrop-blur-lg border border-antiqueGold/30 shadow-xl rounded-3xl p-8">
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-semibold text-mocha">
                Full Name *
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="mt-2 w-full border border-gray-300 rounded-xl px-4 py-3 outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-mocha">
                Phone Number *
              </label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter phone"
                className="mt-2 w-full border border-gray-300 rounded-xl px-4 py-3 outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-mocha">Email</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="mt-2 w-full border border-gray-300 rounded-xl px-4 py-3 outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-mocha">
                Jewellery Type *
              </label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="mt-2 w-full border border-gray-300 rounded-xl px-4 py-3 outline-none"
              >
                <option value="">Select Jewellery Type</option>
                <option>Ring</option>
                <option>Wedding Rings</option>
                <option>Necklace</option>
                <option>Earrings</option>
                <option>Bangles</option>
                <option>Anklets</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-mocha">
                Metal Type
              </label>
              <select
                name="metal"
                value={form.metal}
                onChange={handleChange}
                className="mt-2 w-full border border-gray-300 rounded-xl px-4 py-3 outline-none"
              >
                <option value="">Select Metal</option>
                <option>Gold</option>
                <option>Diamond</option>
                <option>Platinum</option>
                <option>Silver</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-mocha">
                Budget (₹)
              </label>
              <input
                name="budget"
                value={form.budget}
                onChange={handleChange}
                type="number"
                placeholder="Eg: 15000"
                className="mt-2 w-full border border-gray-300 rounded-xl px-4 py-3 outline-none"
              />
            </div>

            {/* ✅ Reference Image Upload */}
            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-mocha">
                Reference Image (Upload)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={uploadReferenceImage}
                className="mt-2 w-full border border-gray-300 rounded-xl px-4 py-3 outline-none bg-white"
              />

              {uploading && (
                <p className="text-sm text-blue-600 mt-2">Uploading...</p>
              )}

              {refImage && (
                <div className="mt-3">
                  <p className="text-sm font-semibold text-green-700">
                    Reference Image Uploaded ✅
                  </p>
                  <img
                    src={refImage}
                    alt="reference"
                    className="mt-2 w-full max-h-72 object-cover rounded-2xl border"
                  />
                </div>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-semibold text-mocha">
                Design Details *
              </label>
              <textarea
                name="details"
                value={form.details}
                onChange={handleChange}
                rows={5}
                placeholder="Describe your custom jewellery design..."
                className="mt-2 w-full border border-gray-300 rounded-xl px-4 py-3 outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={uploading}
              className="md:col-span-2 bg-antiqueGold text-white font-semibold py-3 rounded-xl hover:opacity-90 transition disabled:opacity-60"
            >
              {uploading ? "Uploading Image..." : "Submit to WhatsApp →"}
            </button>
          </form>
        </div>

        <Link
          to="/"
          className="inline-block mt-8 text-mocha font-semibold hover:text-antiqueGold transition"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
