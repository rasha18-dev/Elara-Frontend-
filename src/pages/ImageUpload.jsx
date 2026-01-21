import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function ImageUpload() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const uploadHandler = async () => {
    try {
      if (!image) {
        toast.warning("Select image");
        return;
      }

      const formData = new FormData();
      formData.append("image", image);

      const res = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setImageUrl(res.data.url);
      toast.success("Uploaded successfully ✅");
    } catch (error) {
      toast.error(error.response?.data?.message || "Upload failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-6">
      <h2 className="text-2xl font-bold">Upload Image</h2>

      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        className="border p-2"
      />

      <button
        onClick={uploadHandler}
        className="bg-black text-white px-6 py-2 rounded"
      >
        Upload
      </button>

      {imageUrl && (
        <div className="mt-5 text-center">
          <p className="font-semibold text-green-600">Uploaded ✅</p>
          <img src={imageUrl} alt="uploaded" className="w-60 mt-3 rounded" />
          <p className="text-sm break-all mt-2">{imageUrl}</p>
        </div>
      )}
    </div>
  );
}
