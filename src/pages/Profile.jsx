import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function Profile() {
  const navigate = useNavigate();

  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  const token = userInfo?.token;

  // ✅ Fix: your userInfo structure may be { user: {...} } or directly {...}
  const currentUser = userInfo?.user || userInfo;

  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");

  // ✅ Password fields
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  // ✅ Update profile
  const updateHandler = async (e) => {
    e.preventDefault();

    // ✅ password validations
    const wantChangePassword = oldPassword || newPassword || confirmPassword;

    if (wantChangePassword) {
      if (!oldPassword) {
        toast.warning("Please enter your old password");
        return;
      }

      if (!newPassword) {
        toast.warning("Please enter your new password");
        return;
      }

      if (!confirmPassword) {
        toast.warning("Please confirm your new password");
        return;
      }

      if (newPassword.length < 6) {
        toast.warning("New password must be at least 6 characters");
        return;
      }

      if (newPassword !== confirmPassword) {
        toast.error("New password and Confirm password not match ❌");
        return;
      }
    }

    try {
      setLoading(true);

      const payload = {
        name,
        email,
      };

      // ✅ send password only if user wants to change
      if (wantChangePassword) {
        payload.oldPassword = oldPassword;
        payload.password = newPassword;
      }

      const { data } = await axios.put(
        "http://localhost:5000/api/users/profile",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Profile updated ✅");

      localStorage.setItem("userInfo", JSON.stringify(data));

      // ✅ clear password fields
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  // ✅ logout
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    toast.info("Logged out 👋");
    navigate("/login");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#2B1B14]">My Profile</h1>

        <button
          onClick={handleLogout}
          className="px-5 py-2 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* ✅ Top buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        <Link
          to="/my-orders"
          className="px-5 py-2 rounded-full bg-[#D4AF37] text-[#2B1B14] font-semibold hover:bg-[#B68D2C] transition"
        >
          My Orders
        </Link>

        <Link
          to="/products"
          className="px-5 py-2 rounded-full bg-[#2B1B14] text-white font-semibold hover:bg-black transition"
        >
          Back to Shop
        </Link>
      </div>

      {/* ✅ Profile form */}
      <form
        onSubmit={updateHandler}
        className="bg-white border rounded-3xl shadow p-6 space-y-5"
      >
        {/* Name */}
        <div>
          <label className="block text-sm font-semibold mb-1">Name</label>
          <input
            className="w-full border rounded-xl px-4 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold mb-1">Email</label>
          <input
            className="w-full border rounded-xl px-4 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </div>

        {/* ✅ Password section */}
        <div className="border-t pt-5">
          <h2 className="text-lg font-bold text-[#2B1B14] mb-4">
            Change Password (Optional)
          </h2>

          {/* Old Password */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">
              Old Password
            </label>
            <input
              className="w-full border rounded-xl px-4 py-2"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter old password"
            />
          </div>

          {/* New Password */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">
              New Password
            </label>
            <input
              className="w-full border rounded-xl px-4 py-2"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Confirm New Password
            </label>
            <input
              className="w-full border rounded-xl px-4 py-2"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter new password"
            />
          </div>

          <p className="text-xs text-gray-400 mt-2">
            Leave fields empty if you don’t want to change password.
          </p>
        </div>

        <button
          disabled={loading}
          className="w-full bg-[#2B1B14] text-white font-semibold py-3 rounded-xl hover:bg-black disabled:opacity-60 transition"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}
