import { Link } from "react-router-dom";

export default function Login() {
  return (
    <section className="bg-ivory min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-3xl p-10 shadow-lg w-full max-w-md">

        <h2 className="text-2xl font-luxury text-darkBrown text-center">
          Login
        </h2>

        <form className="mt-8 space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-xl px-4 py-3"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-xl px-4 py-3"
          />

          <button
            className="w-full mt-4 bg-darkBrown text-ivory py-3 rounded-full"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-softGold">
            Register
          </Link>
        </p>

      </div>
    </section>
  );
}
