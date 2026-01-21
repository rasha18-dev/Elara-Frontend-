import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ redirect after login
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setErrorMsg(""); // ✅ clear previous error

    try {
      setLoading(true);

      const { data } = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));

     toast.success("Login Success ✅");


      // ✅ Go back to previous page (redirect)
      navigate(redirect);
    } catch (error) {
      const msg = error?.response?.data?.message || "Login failed ❌";
      setErrorMsg(msg);
     toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-ivory flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-antiqueGold/40 overflow-hidden">
        {/* Top Luxury Header */}
        <div className="px-10 pt-10 pb-6 text-center bg-gradient-to-b from-champagne to-white">
          <p className="text-xs tracking-[0.35em] text-antiqueGold font-semibold">
            ELARA
          </p>
          <h2 className="text-3xl font-luxury text-softBrown mt-3">
            Welcome Back
          </h2>
        </div>

        <div className="px-10 pb-10">
          {/* Error Box */}
          {errorMsg && (
            <div className="mb-5 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl text-sm">
              {errorMsg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={submitHandler} className="space-y-5">
            {/* Email */}
            <div>
              <label className="text-sm text-mocha font-medium">
                Email Address
              </label>
              <div className="relative mt-2">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-mocha/50"
                />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-antiqueGold/40 rounded-2xl px-11 py-3 outline-none
                             focus:ring-2 focus:ring-antiqueGold/30 focus:border-antiqueGold transition"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-mocha font-medium">Password</label>
              <div className="relative mt-2">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-mocha/50"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-antiqueGold/40 rounded-2xl px-11 py-3 pr-12 outline-none
                             focus:ring-2 focus:ring-antiqueGold/30 focus:border-antiqueGold transition"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-softBrown hover:text-antiqueGold transition"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Forgot Password */}
              <div className="text-right mt-2">
                <Link
                  to="/forgot-password"
                  className="text-sm text-antiqueGold hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full py-3 font-semibold text-white transition
                         bg-gradient-to-r from-antiqueGold via-[#c79d2b] to-[#a77a16]
                         hover:shadow-lg hover:scale-[1.01] active:scale-[0.99]
                         disabled:opacity-60 disabled:hover:scale-100"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* Register */}
            <p className="text-sm text-center text-mocha/70">
              Don’t have an account?{" "}
              <Link
                to={`/register?redirect=${redirect}`}
                className="text-antiqueGold font-semibold hover:underline"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
