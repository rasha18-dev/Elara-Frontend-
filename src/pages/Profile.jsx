import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";
import { User, Mail, Lock, LogOut, ShoppingBag, Store } from "lucide-react";

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

      const { data } = await api.put(
        "/profile",
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
    <div className="min-h-screen bg-[#F9F6F0] py-16 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 border-b border-[#B08D55]/20 pb-8">
          <div>
            <span className="text-[#B08D55] text-xs font-bold tracking-[0.2em] uppercase mb-2 block">
              My Account
            </span>
            <h1 className="text-4xl md:text-5xl font-luxury text-[#5D4037]">
              Profile Settings
            </h1>
          </div>

          <button
            onClick={handleLogout}
            className="group mt-6 md:mt-0 flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#5D4037]/20 text-[#5D4037] text-sm font-medium hover:bg-[#5D4037] hover:text-white transition-all duration-300"
          >
            <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Sign Out
          </button>
        </div>

        {/* Quick Links */}
        {!isAdmin && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Link
              to="/my-orders"
              className="relative group p-6 rounded-sm bg-white border border-[#B08D55]/10 hover:border-[#B08D55]/40 transition-all duration-300 shadow-sm hover:shadow-md flex items-center gap-5 overflow-hidden"
            >
              <div className="absolute inset-0 bg-[#B08D55]/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              <div className="w-12 h-12 rounded-full bg-[#F9F6F0] flex items-center justify-center border border-[#B08D55]/20 group-hover:bg-[#B08D55] transition-colors duration-300">
                <ShoppingBag className="w-5 h-5 text-[#B08D55] group-hover:text-white transition-colors" />
              </div>
              <div className="relative z-10">
                <h3 className="font-luxury text-xl text-[#121212]">My Orders</h3>
                <p className="text-sm text-[#121212]/50">View your purchase history</p>
              </div>
            </Link>

            <Link
              to="/products"
              className="relative group p-6 rounded-sm bg-white border border-[#B08D55]/10 hover:border-[#B08D55]/40 transition-all duration-300 shadow-sm hover:shadow-md flex items-center gap-5 overflow-hidden"
            >
              <div className="absolute inset-0 bg-[#B08D55]/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              <div className="w-12 h-12 rounded-full bg-[#F9F6F0] flex items-center justify-center border border-[#B08D55]/20 group-hover:bg-[#B08D55] transition-colors duration-300">
                <Store className="w-5 h-5 text-[#B08D55] group-hover:text-white transition-colors" />
              </div>
              <div className="relative z-10">
                <h3 className="font-luxury text-xl text-[#121212]">Continue Shopping</h3>
                <p className="text-sm text-[#121212]/50">Discover our latest collection</p>
              </div>
            </Link>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Sidebar - Welcome Card */}
          <div className="lg:col-span-4 order-1 lg:order-2">
            <div className="bg-[#121212] text-[#F9F6F0] p-8 rounded-sm relative overflow-hidden shadow-2xl">
              {/* Decor */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#B08D55] blur-[60px] opacity-20" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#B08D55] blur-[50px] opacity-20" />

              <div className="relative z-10">
                <p className="text-[#B08D55] text-xs font-bold tracking-widest uppercase mb-4">Welcome Back</p>
                <h3 className="text-3xl font-luxury mb-2">{currentUser?.name || "Guest"}</h3>
                <p className="text-white/40 text-sm mb-8 break-all">{currentUser?.email}</p>

                <div className="space-y-4 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-3 text-sm text-white/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    Account Active
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    Email Verified
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <div className="lg:col-span-8 order-2 lg:order-1">
            <form onSubmit={updateHandler} className="bg-white p-8 md:p-10 rounded-sm shadow-sm border border-[#B08D55]/10">

              <div className="mb-10">
                <h2 className="text-2xl font-luxury text-[#5D4037] mb-6 flex items-center gap-3">
                  <User className="w-6 h-6 text-[#B08D55]" />
                  Personal Information
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-[#121212]/60 uppercase tracking-wider mb-2">
                      Full Name
                    </label>
                    <input
                      className="w-full bg-[#FAFAFA] border border-[#E5E5E5] text-[#121212] px-5 py-4 text-sm focus:border-[#B08D55] focus:bg-white outline-none transition-all duration-300 placeholder:text-[#121212]/20"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#121212]/60 uppercase tracking-wider mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        className="w-full bg-[#FAFAFA] border border-[#E5E5E5] text-[#121212] px-5 py-4 text-sm focus:border-[#B08D55] focus:bg-white outline-none transition-all duration-300 placeholder:text-[#121212]/20"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                      />
                      <Mail className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#121212]/30" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Password Section */}
              <div className="pt-8 border-t border-[#F5F5F5]">
                <button
                  type="button"
                  onClick={() => setShowPasswordSection(!showPasswordSection)}
                  className="flex items-center gap-3 text-lg font-luxury text-[#5D4037] hover:text-[#B08D55] transition-colors mb-6 group w-full"
                >
                  <Lock className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Security & Password</span>
                  <span className="text-xs font-sans text-gray-400 ml-auto border border-gray-200 px-3 py-1 rounded-full group-hover:border-[#B08D55] transition-colors">
                    {showPasswordSection ? "Cancel" : "Edit"}
                  </span>
                </button>

                {showPasswordSection && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="p-5 bg-[#FFFBF2] border border-[#B08D55]/10 rounded-sm">
                      <p className="text-xs text-[#B08D55] flex items-center gap-2">
                        <span>ℹ️</span> Leave regular fields empty if you don't want to change your password.
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#121212]/60 uppercase tracking-wider mb-2">Current Password</label>
                      <input
                        type="password"
                        className="w-full bg-[#FAFAFA] border border-[#E5E5E5] px-5 py-4 text-sm focus:border-[#B08D55] focus:bg-white outline-none transition-all"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        placeholder="••••••••"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-[#121212]/60 uppercase tracking-wider mb-2">New Password</label>
                        <input
                          type="password"
                          className="w-full bg-[#FAFAFA] border border-[#E5E5E5] px-5 py-4 text-sm focus:border-[#B08D55] focus:bg-white outline-none transition-all"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Min 6 characters"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#121212]/60 uppercase tracking-wider mb-2">Confirm New Password</label>
                        <input
                          type="password"
                          className="w-full bg-[#FAFAFA] border border-[#E5E5E5] px-5 py-4 text-sm focus:border-[#B08D55] focus:bg-white outline-none transition-all"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Re-enter new password"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="mt-10">
                <button
                  disabled={loading}
                  className="w-full bg-[#121212] text-white font-bold text-sm tracking-widest uppercase py-4 hover:bg-[#B08D55] disabled:opacity-70 disabled:hover:bg-[#121212] transition-colors duration-300 shadow-lg"
                >
                  {loading ? "Updating Profile..." : "Save Changes"}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
