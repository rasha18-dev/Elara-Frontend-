import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpToken, setOtpToken] = useState(""); // ✅ already correct

  /* ================= SEND OTP ================= */
  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.warning("Enter email");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/users/forgot-password",
        { email }
      );

      setOtpToken(res.data.otpToken);

      toast.success("OTP sent to email ✅");
      setShowOtp(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  /* ================= RESET PASSWORD ================= */
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!otp || !newPassword) {
      toast.warning("Enter OTP and new password");
      return;
    }

    try {
      setLoading(true);

      await axios.post("http://localhost:5000/api/users/reset-password", {
        otp: otp.trim(),
        otpToken, // ✅ REQUIRED
        newPassword,
      });

      toast.success("Password reset successful ✅");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid or expired OTP ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf6ef] px-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8">
        <h2 className="text-2xl font-serif text-center mb-6">
          Reset Password
        </h2>

        {/* ================= EMAIL PAGE ================= */}
        {!showOtp && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border rounded-full px-4 py-3 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#d4af37] text-white py-3 rounded-full font-semibold disabled:opacity-60"
            >
              {loading ? "Sending..." : "SEND OTP"}
            </button>
          </form>
        )}

        {/* ================= OTP PAGE ================= */}
        {showOtp && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full border rounded-full px-4 py-3 outline-none"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <input
              type="password"
              placeholder="New Password"
              className="w-full border rounded-full px-4 py-3 outline-none"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#d4af37] text-white py-3 rounded-full font-semibold disabled:opacity-60"
            >
              {loading ? "Resetting..." : "RESET PASSWORD"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
