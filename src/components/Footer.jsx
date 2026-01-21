import { Link } from "react-router-dom";
import { PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

export default function Footer() {
  return (
    <footer className="bg-champagne text-darkBrown">
      {/* ✅ Top Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* ✅ BRAND */}
          <div>
            <h3 className="text-3xl font-luxury text-darkBrown tracking-wide">
              ELARA
            </h3>

            <p className="mt-4 text-sm md:text-base text-darkBrown/80 leading-relaxed max-w-sm">
              Timeless jewellery crafted with elegance, purity, and modern
              luxury. Designed to sparkle with every moment.
            </p>

            {/* ✅ Social Icons */}
            <div className="flex gap-4 mt-7">
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-full border border-darkBrown/25 flex items-center justify-center hover:bg-softGold hover:text-white hover:border-softGold transition"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm4.25 5.5a4.75 4.75 0 1 0 0 9.5 4.75 4.75 0 0 0 0-9.5Zm6-1.75a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" />
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-full border border-darkBrown/25 flex items-center justify-center hover:bg-softGold hover:text-white hover:border-softGold transition"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.52 3.48A11.87 11.87 0 0 0 12.03 0C5.39 0 .05 5.34.05 11.98c0 2.11.55 4.17 1.6 6L0 24l6.2-1.62a11.9 11.9 0 0 0 5.82 1.48h.01c6.63 0 11.98-5.34 11.98-11.98 0-3.2-1.25-6.21-3.49-8.4ZM12.03 21.5h-.01a9.9 9.9 0 0 1-5.05-1.39l-.36-.22-3.68.96.98-3.58-.24-.37a9.88 9.88 0 0 1-1.52-5.28c0-5.45 4.43-9.88 9.89-9.88a9.82 9.82 0 0 1 6.98 2.89 9.82 9.82 0 0 1 2.9 6.99c0 5.45-4.44 9.88-9.89 9.88Zm5.43-7.41c-.3-.15-1.77-.87-2.05-.97-.28-.1-.48-.15-.69.15-.2.3-.79.97-.97 1.17-.18.2-.36.22-.66.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.8-1.67-2.1-.18-.3-.02-.46.13-.61.13-.13.3-.36.45-.54.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.08-.15-.69-1.65-.95-2.27-.25-.6-.5-.52-.69-.53h-.59c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5 0 1.47 1.08 2.89 1.23 3.09.15.2 2.13 3.25 5.17 4.56.72.31 1.28.5 1.72.64.72.23 1.37.2 1.88.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.18-1.42-.08-.12-.28-.2-.58-.35Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* ✅ QUICK LINKS */}
          <div className="md:pl-6">
            <h4 className="text-lg font-luxury text-darkBrown mb-5">
              Quick Links
            </h4>

            <ul className="space-y-3 text-sm md:text-base text-darkBrown/80">
              <li>
                <Link className="hover:text-softGold transition" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="hover:text-softGold transition" to="/products">
                  Collections
                </Link>
              </li>
              <li>
                <Link className="hover:text-softGold transition" to="/profile">
                  My Profile
                </Link>
              </li>
              <li>
                <Link className="hover:text-softGold transition" to="/my-orders">
                  My Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* ✅ CONTACT */}
          <div className="md:pl-6">
            <h4 className="text-lg font-luxury text-darkBrown mb-5">Contact</h4>

            <div className="space-y-4 text-sm md:text-base text-darkBrown/80">
              <div className="flex items-center gap-3">
                <PhoneIcon className="w-5 h-5" />
                <span>+91 7736952028</span>
              </div>

              <div className="flex items-center gap-3">
                <EnvelopeIcon className="w-5 h-5" />
                <span>elara@gmail.com</span>
              </div>

              <p className="text-xs text-darkBrown/60 leading-relaxed">
                Support available Mon–Sat, 9 AM – 6 PM.
              </p>
            </div>
          </div>

          {/* ✅ NEWSLETTER */}
          <div className="md:pl-6">
            <h4 className="text-lg font-luxury text-darkBrown mb-5">
              Newsletter
            </h4>

            <p className="text-sm md:text-base text-darkBrown/80 leading-relaxed">
              Subscribe for latest offers and new collections.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Subscribed ✅");
              }}
              className="mt-5 flex items-center bg-white rounded-full border border-darkBrown/20 overflow-hidden shadow-sm"
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="w-full px-4 py-3 text-sm outline-none bg-transparent"
              />

              <button
                type="submit"
                className="bg-[#2B1B14] text-white px-6 py-3 font-semibold hover:bg-black transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ✅ Bottom Footer */}
      <div className="border-t border-darkBrown/20">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row gap-3 items-center justify-between text-sm text-darkBrown/70">
          <p>© {new Date().getFullYear()} ELARA Jewellery. All rights reserved.</p>
          <p className="tracking-wide">
            Made with <span className="text-softGold font-semibold">♥</span> by
            ELARA
          </p>
        </div>
      </div>
    </footer>
  );
}
