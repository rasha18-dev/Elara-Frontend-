import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ redirect support
  const redirect =
    new URLSearchParams(location.search).get("redirect") || "/login";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    // ✅ Validation
    if (!name.trim()) {
      toast.warning("Please enter your name");
      return;
    }

    if (!email.trim()) {
      toast.warning("Please enter your email");
      return;
    }

    if (password.length < 6) {
      toast.warning("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.post(
        "http://localhost:5000/api/users/register",
        { name, email, password }
      );

      console.log("REGISTER SUCCESS:", data);
      toast.success("Registration successful ✅");

      // ✅ after register -> go login with redirect
      navigate(`/login?redirect=${redirect}`);
    } catch (error) {
      console.error("REGISTER ERROR:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Registration failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-3xl shadow-lg w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-[#2B1B14] text-center mb-2">
          Create Account
        </h2>
        <p className="text-gray-600 text-center text-sm mb-8">
          Join RUMEA and start shopping
        </p>

        <form className="space-y-5" onSubmit={submitHandler}>
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-[#2B1B14] mb-2">
              Full Name
            </label>
            <input
              placeholder="Enter your full name"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37] focus:ring-opacity-20 transition"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-[#2B1B14] mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37] focus:ring-opacity-20 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-[#2B1B14] mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password (min 6 characters)"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37] focus:ring-opacity-20 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#2B1B14] to-[#4A2F25] text-white py-3 rounded-xl font-bold hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed transition transform hover:scale-105 active:scale-95 mt-6"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-sm text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <Link
            to={`/login?redirect=${redirect}`}
            className="text-[#D4AF37] font-semibold hover:text-[#B68D2C] transition"
          >
            Login here
          </Link>
        </p>
      </div>
    </section>
  );
}
