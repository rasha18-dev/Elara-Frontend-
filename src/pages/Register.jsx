import { Link } from "react-router-dom";

export default function Register() {
  return (
    <section className="bg-ivory min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-3xl p-10 shadow-lg w-full max-w-md">

        <h2 className="text-2xl font-luxury text-darkBrown text-center">
          Register
        </h2>

        <form className="mt-8 space-y-4">
          <input placeholder="Name" className="w-full border rounded-xl px-4 py-3" />
          <input placeholder="Email" className="w-full border rounded-xl px-4 py-3" />
          <input placeholder="Password" className="w-full border rounded-xl px-4 py-3" />

          <button className="w-full bg-darkBrown text-ivory py-3 rounded-full">
            Create Account
          </button>
        </form>

        <p className="text-sm text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-softGold">
            Login
          </Link>
        </p>

      </div>
    </section>
  );
}
