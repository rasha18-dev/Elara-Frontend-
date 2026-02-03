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
  const isAdmin = currentUser?.isAdmin;


  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");

  // ✅ Password fields
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswordSection, setShowPasswordSection] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  // ✅ Update profile
  const updateHandler = async (e) => {
  e.preventDefault();

  // check if user wants to change password
  const wantChangePassword = oldPassword || newPassword || confirmPassword;

  // password validations
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

    // ✅ IMPORTANT FIX: send newPassword (not password)
    if (wantChangePassword) {
      payload.oldPassword = oldPassword;
      payload.newPassword = newPassword;
    }

    const { data } = await axios.put(
      "http://localhost:5000/api/users/profile",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Profile updated ✅");

    // update localStorage
    localStorage.setItem("userInfo", JSON.stringify(data));

    // clear password fields
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#2B1B14] mb-2">
                My Profile
              </h1>
              <p className="text-gray-600 text-lg">Manage your account and settings</p>
            </div>
            <button
              onClick={handleLogout}
              className="mt-4 md:mt-0 px-6 py-3 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 transition flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              Logout
            </button>
          </div>

          {/* Quick Links */}
          {/* Quick Links (hide for admin) */}
{!isAdmin && (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <Link
      to="/my-orders"
      className="group px-6 py-4 rounded-2xl bg-white border-2 border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#2B1B14] text-[#2B1B14] font-semibold transition flex items-center gap-3 shadow-md hover:shadow-lg"
    >
      <span className="text-2xl">🛍️</span>
      <span>My Orders</span>
    </Link>

    <Link
      to="/products"
      className="group px-6 py-4 rounded-2xl bg-white border-2 border-[#2B1B14] hover:bg-[#2B1B14] hover:text-white text-[#2B1B14] font-semibold transition flex items-center gap-3 shadow-md hover:shadow-lg"
    >
      <span className="text-2xl">🏪</span>
      <span>Back to Shop</span>
    </Link>
  </div>
)}

        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Form */}
          <div className="lg:col-span-2">
            <form
              onSubmit={updateHandler}
              className="bg-white rounded-3xl shadow-lg overflow-hidden border-t-8 border-[#D4AF37]"
            >
              {/* Basic Info Section */}
              <div className="p-8 border-b">
                <h2 className="text-2xl font-bold text-[#2B1B14] mb-6 flex items-center gap-3">
                  <span className="text-3xl">👤</span>
                  Account Information
                </h2>

                <div className="space-y-5">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-[#2B1B14] mb-2">
                      Full Name
                    </label>
                    <input
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-opacity-20 transition"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-[#2B1B14] mb-2">
                      Email Address
                    </label>
                    <input
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-opacity-20 transition"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>
              </div>

              {/* Password Section */}
              <div className="p-8">
                <button
                  type="button"
                  onClick={() => setShowPasswordSection(!showPasswordSection)}
                  className="w-full flex items-center gap-3 text-lg font-bold text-[#2B1B14] hover:text-[#D4AF37] transition mb-6 group"
                >
                  <span className="text-2xl group-hover:scale-110 transition">{showPasswordSection ? '🔓' : '🔒'}</span>
                  <span>Change Password (Optional)</span>
                </button>

                {showPasswordSection && (
                  <div className="space-y-5 pt-6 border-t">
                    {/* Old Password */}
                    <div>
                      <label className="block text-sm font-semibold text-[#2B1B14] mb-2">
                        Current Password
                      </label>
                      <input
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-opacity-20 transition"
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        placeholder="Enter your current password"
                      />
                    </div>

                    {/* New Password */}
                    <div>
                      <label className="block text-sm font-semibold text-[#2B1B14] mb-2">
                        New Password
                      </label>
                      <input
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-opacity-20 transition"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter your new password (min 6 characters)"
                      />
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="block text-sm font-semibold text-[#2B1B14] mb-2">
                        Confirm New Password
                      </label>
                      <input
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-opacity-20 transition"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter your new password"
                      />
                    </div>

                    <p className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                      💡 Leave password fields empty if you don't want to change your password.
                    </p>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="p-8 bg-gray-50 border-t">
                <button
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#2B1B14] to-[#4A2F25] text-white font-semibold py-4 rounded-xl hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed transition transform hover:scale-105 active:scale-95 text-lg"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Updating...
                    </span>
                  ) : (
                    "Update Profile"
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Sidebar Info Cards */}
          <div className="lg:col-span-1">
            {/* User Welcome Card */}
            <div className="bg-gradient-to-br from-[#D4AF37] to-[#B68D2C] rounded-3xl p-8 text-[#2B1B14] shadow-lg">
              <h3 className="text-2xl font-bold mb-2">Welcome Back! 👋</h3>
              <p className="text-sm opacity-90 font-semibold">{currentUser?.name || "User"}</p>
              <div className="mt-6 space-y-3 text-sm">
                <p className="flex items-center gap-2">
                  <span className="text-lg">✓</span>
                  <span>Account Active</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-lg">✓</span>
                  <span>Email Verified</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
