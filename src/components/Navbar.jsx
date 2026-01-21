import { useEffect, useState } from "react";
import { Heart, ShoppingCart, UserCircle2, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // ✅ MODALS
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showFavModal, setShowFavModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const navigate = useNavigate();
  const { cartItems } = useCart();
  const cartCount = cartItems.length;

  // ✅ SAFE localStorage parsing
  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  const token = userInfo?.token;
  const isAdmin = userInfo?.user?.isAdmin;

  // ✅ LOGOUT ACTION
  const confirmLogout = () => {
    localStorage.removeItem("userInfo");
    setShowLogoutModal(false);
    navigate("/login");
  };

  // ✅ FAVOURITE CLICK ACTION
  const handleFavouriteClick = () => {
    if (!token) {
      setShowLoginModal(true);
      return;
    }
    setShowFavModal(true);
  };

  // ✅ LOGIN REDIRECT ACTION
  const goToLogin = () => {
    setShowLoginModal(false);
    navigate("/login");
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
        bg-ivory text-mocha border-b border-antiqueGold/40
        ${scrolled ? "shadow-md" : ""}`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 h-16">
          {/* LOGO */}
          <h1
            onClick={() => {
              setOpen(false);
              navigate("/");
            }}
            className="text-2xl font-luxury text-softBrown cursor-pointer select-none"
          >
            ELARA
          </h1>

          {/* ✅ DESKTOP MENU */}
          <ul className="hidden md:flex gap-8 text-sm tracking-wider text-mocha">
            <li className="hover:text-antiqueGold cursor-pointer">
              <Link to="/products">All Jewellery</Link>
            </li>

            <li className="hover:text-antiqueGold cursor-pointer">
              <Link to="/products?category=Diamond">Diamond</Link>
            </li>

            <li className="hover:text-antiqueGold cursor-pointer">
              <Link to="/products?category=Earrings">Earrings</Link>
            </li>

            <li className="hover:text-antiqueGold cursor-pointer">
              <Link to="/products?category=Rings">Rings</Link>
            </li>

            <li className="hover:text-antiqueGold cursor-pointer">
              <Link to="/products?category=Necklace">Necklace</Link>
            </li>

            <li className="hover:text-antiqueGold cursor-pointer">
              <Link to="/products?category=Bangles">Bangles</Link>
            </li>

            {/* ✅ ADMIN LINK */}
            {isAdmin && (
              <li className="hover:text-antiqueGold cursor-pointer font-semibold">
                <Link to="/admin/dashboard">Admin</Link>
              </li>
            )}
          </ul>

          {/* ✅ DESKTOP ICONS */}
          <div className="hidden md:flex items-center gap-6 text-softBrown">
            {/* ❤️ Favourite */}
            <button
              onClick={handleFavouriteClick}
              className="cursor-pointer hover:text-antiqueGold transition"
              title="Favourites"
            >
              <Heart />
            </button>

            {/* CART */}
            <Link to="/cart" className="relative cursor-pointer">
              <ShoppingCart className="hover:text-antiqueGold transition" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-antiqueGold text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* ✅ LOGIN OR PROFILE + LOGOUT */}
            {!token ? (
              <Link
                to="/login"
                className="flex items-center gap-2 hover:text-antiqueGold transition"
              >
                <UserCircle2 />
                <span className="text-sm font-semibold">Login</span>
              </Link>
            ) : (
              <div className="flex items-center gap-4">
                {/* Profile */}
                <Link
                  to="/profile"
                  className="flex items-center gap-2 hover:text-antiqueGold transition"
                >
                  <UserCircle2 />
                </Link>

                {/* Logout */}
                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="flex items-center gap-2 hover:text-antiqueGold transition"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            )}
          </div>

          {/* ✅ MOBILE BUTTON */}
          <button
            className="md:hidden text-3xl text-softBrown"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>

        {/* ✅ MOBILE MENU */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out
          ${open ? "max-h-[900px] opacity-100" : "max-h-0 opacity-0"}`}
        >
          <ul
            className="flex flex-col items-center gap-6 py-8 bg-champagne text-mocha
            text-sm tracking-wider border-t border-antiqueGold/40"
          >
            {/* ✅ Category Links */}
            <li>
              <Link to="/products" onClick={() => setOpen(false)}>
                All Jewellery
              </Link>
            </li>

            <li>
              <Link to="/products?category=Diamond" onClick={() => setOpen(false)}>
                Diamond
              </Link>
            </li>

            <li>
              <Link to="/products?category=Earrings" onClick={() => setOpen(false)}>
                Earrings
              </Link>
            </li>

            <li>
              <Link to="/products?category=Rings" onClick={() => setOpen(false)}>
                Rings
              </Link>
            </li>

            <li>
              <Link to="/products?category=Necklace" onClick={() => setOpen(false)}>
                Necklace
              </Link>
            </li>

            <li>
              <Link to="/products?category=Bangles" onClick={() => setOpen(false)}>
                Bangles
              </Link>
            </li>

            {/* ✅ ADMIN LINK (Mobile) */}
            {isAdmin && (
              <li className="font-semibold">
                <Link to="/admin/dashboard" onClick={() => setOpen(false)}>
                  Admin
                </Link>
              </li>
            )}

            {/* ✅ Divider */}
            <div className="w-10/12 h-[1px] bg-antiqueGold/30"></div>

            {/* ✅ Profile / Orders / Logout if logged in */}
            {token ? (
              <>
                <li>
                  <Link to="/profile" onClick={() => setOpen(false)}>
                    👤 Profile
                  </Link>
                </li>

                <li>
                  <Link to="/my-orders" onClick={() => setOpen(false)}>
                    📦 My Orders
                  </Link>
                </li>

                <li>
                  <button
                    onClick={() => {
                      setShowLogoutModal(true);
                      setOpen(false);
                    }}
                    className="font-semibold hover:text-antiqueGold transition"
                  >
                    🚪 Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login" onClick={() => setOpen(false)}>
                  🔐 Login
                </Link>
              </li>
            )}

            {/* ✅ Divider */}
            <div className="w-10/12 h-[1px] bg-antiqueGold/30"></div>

            {/* ✅ Mobile Icons (Fav + Cart) */}
            <div className="flex items-center gap-10 pt-2 text-softBrown">
              {/* ❤️ Favourite */}
              <button
                onClick={() => {
                  handleFavouriteClick();
                  setOpen(false);
                }}
                className="hover:text-antiqueGold transition"
                title="Favourites"
              >
                <Heart />
              </button>

              {/* 🛒 Cart */}
              <Link
                to="/cart"
                onClick={() => setOpen(false)}
                className="relative"
              >
                <ShoppingCart className="hover:text-antiqueGold transition" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-antiqueGold text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </ul>
        </div>
      </nav>

      {/* ✅ LOGOUT CONFIRM MODAL */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-ivory p-6 shadow-xl border border-antiqueGold/40">
            <h2 className="text-lg font-semibold text-mocha">Confirm Logout</h2>
            <p className="text-sm text-softBrown mt-2">
              Are you sure you want to logout?
            </p>

            <div className="mt-6 flex gap-3 justify-end">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 rounded-xl border border-softBrown/30 text-mocha hover:bg-softBrown/10 transition"
              >
                Cancel
              </button>

              <button
                onClick={confirmLogout}
                className="px-4 py-2 rounded-xl bg-antiqueGold text-white hover:opacity-90 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ LOGIN REQUIRED MODAL */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-ivory p-6 shadow-xl border border-antiqueGold/40">
            <h2 className="text-lg font-semibold text-mocha">Login Required</h2>
            <p className="text-sm text-softBrown mt-2">
              Please login to view your favourites ❤️
            </p>

            <div className="mt-6 flex gap-3 justify-end">
              <button
                onClick={() => setShowLoginModal(false)}
                className="px-4 py-2 rounded-xl border border-softBrown/30 text-mocha hover:bg-softBrown/10 transition"
              >
                Cancel
              </button>

              <button
                onClick={goToLogin}
                className="px-4 py-2 rounded-xl bg-antiqueGold text-white hover:opacity-90 transition"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ FAVOURITES MODAL */}
      {showFavModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-ivory p-6 shadow-xl border border-antiqueGold/40">
            <h2 className="text-lg font-semibold text-mocha">Your Favourites ❤️</h2>
            <p className="text-sm text-softBrown mt-2">
              You can view all favourite products here.
            </p>

            <div className="mt-4 p-4 rounded-xl bg-champagne/40 text-sm text-mocha">
              Click “View All” to see favourites list.
            </div>

            <div className="mt-6 flex gap-3 justify-end">
              <button
                onClick={() => setShowFavModal(false)}
                className="px-4 py-2 rounded-xl border border-softBrown/30 text-mocha hover:bg-softBrown/10 transition"
              >
                Close
              </button>

              <button
                onClick={() => {
                  setShowFavModal(false);
                  navigate("/favourites");
                }}
                className="px-4 py-2 rounded-xl bg-antiqueGold text-white hover:opacity-90 transition"
              >
                View All
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
