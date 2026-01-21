import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ redirect support
  const redirect =
    new URLSearchParams(location.search).get("redirect") || "/login";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/register",
        { name, email, password }
      );

      console.log("REGISTER SUCCESS:", data);
     toast.success("Registration successful ✅");


      // ✅ after register -> go login with redirect
      navigate(`/login?redirect=${redirect}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed ❌");

    }
  };

  return (
    <section className="bg-ivory min-h-screen flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl p-10 shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-luxury text-darkBrown text-center">
          Register
        </h2>

        <form className="mt-8 space-y-4" onSubmit={submitHandler}>
          <input
            placeholder="Name"
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#D4AF37]"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#D4AF37]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#D4AF37]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
  type="submit"
  className="w-full bg-[#2B1B14] text-white py-3 rounded-full font-semibold hover:bg-black transition"
>
  Create Account
</button>

        </form>

        <p className="text-sm text-center mt-6">
          Already have an account?{" "}
          <Link to={`/login?redirect=${redirect}`} className="text-softGold">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
