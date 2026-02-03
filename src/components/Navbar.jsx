import { useEffect, useState } from "react";
import { Heart, ShoppingCart, UserCircle2, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useFav } from "../context/FavouriteContext";


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // ✅ MODALS
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showFavModal, setShowFavModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const navigate = useNavigate();
  const { cartItems = [], clearCart } = useCart();
  const cartCount = cartItems?.length || 0;

  const { favs = [], clearFavs } = useFav();
  const favCount = favs.length;


  // ✅ SAFE localStorage parsing
  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  const token = userInfo?.token;
  // ✅ Check isAdmin from multiple possible locations
  const isAdmin = userInfo?.user?.isAdmin || userInfo?.isAdmin || false;

  // ✅ Debug: Log admin status (remove later if needed)
  useEffect(() => {
    if (token) {
      console.log("🔐 User Info:", userInfo);
      console.log("👤 Is Admin:", isAdmin);
    }
  }, [token, isAdmin]);

  const confirmLogout = () => {
    localStorage.removeItem("userInfo");
    clearCart();
    clearFavs();          // ❤️ CLEAR FAVOURITES
    setShowLogoutModal(false);

    navigate("/login");
  };



  // ✅ FAVOURITE CLICK ACTION
  const handleFavouriteClick = () => {
    if (!token) {
      setShowLoginModal(true);
      return;
    }

    navigate("/favourites");
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
        ${scrolled ? "bg-ivory/90 backdrop-blur-lg shadow-luxury py-3 border-b border-gray-100" : "bg-transparent py-5"}`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
          {/* LOGO */}
          <h1
            onClick={() => {
              setOpen(false);
              navigate("/");
            }}
            className="text-3xl font-luxury font-bold tracking-wide text-richBlack cursor-pointer select-none"
          >
            ELARA
          </h1>

          {/* ✅ DESKTOP MENU */}
          <ul className="hidden md:flex gap-10 text-sm font-medium tracking-wider text-richBlack/80">
            <li className="hover:text-antiqueGold transition duration-300 transform hover:translate-y-[-1px]">
              <Link to="/products">All Jewellery</Link>
            </li>

            <li className="hover:text-antiqueGold transition duration-300 transform hover:translate-y-[-1px]">
              <Link to="/products?category=Diamond">Diamond</Link>
            </li>

            <li className="hover:text-antiqueGold transition duration-300 transform hover:translate-y-[-1px]">
              <Link to="/products?category=Earrings">Earrings</Link>
            </li>

            <li className="hover:text-antiqueGold transition duration-300 transform hover:translate-y-[-1px]">
              <Link to="/products?category=Rings">Rings</Link>
            </li>

            <li className="hover:text-antiqueGold transition duration-300 transform hover:translate-y-[-1px]">
              <Link to="/products?category=Necklace">Necklace</Link>
            </li>

            <li className="hover:text-antiqueGold transition duration-300 transform hover:translate-y-[-1px]">
              <Link to="/products?category=Bangles">Bangles</Link>
            </li>

            {/* ✅ ADMIN LINK */}
            {isAdmin && (
              <li className="hover:text-antiqueGold cursor-pointer font-semibold bg-antiqueGold/10 px-4 py-1.5 rounded-full transition">
                <Link to="/admin" className="flex items-center gap-1.5">
                  🛡️ Admin
                </Link>
              </li>
            )}
          </ul>

          {/* ✅ DESKTOP ICONS */}
          <div className="hidden md:flex items-center gap-8 text-richBlack/80">
            {/* ❤️ Favourite */}
            <button
              onClick={handleFavouriteClick}
              className="relative cursor-pointer hover:text-antiqueGold transition transform hover:scale-110"
              title="Favourites"
            >

              <Heart strokeWidth={1.5} />
              {favCount > 0 && (
                <span className="absolute -top-1 -right-1.5 bg-antiqueGold text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full animate-bounce">
                  {favCount}
                </span>
              )}
            </button>

            {/* CART */}

            <button
              onClick={() => {
                if (!token) {
                  localStorage.setItem("redirectAfterLogin", "/cart");
                  navigate("/login");
                } else {
                  navigate("/cart");
                }
              }}
              className="relative cursor-pointer hover:text-antiqueGold transition transform hover:scale-110"
            >
              <ShoppingCart strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1.5 bg-antiqueGold text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* ✅ LOGIN OR PROFILE + LOGOUT */}
            {!token ? (
              <Link
                to="/login"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-richBlack/20 hover:border-antiqueGold hover:text-antiqueGold transition text-xs font-semibold uppercase tracking-widest"
              >
                <UserCircle2 size={18} />
                <span>Login</span>
              </Link>
            ) : (
              <div className="flex items-center gap-6">
                {/* Profile */}
                <Link
                  to="/profile"
                  className="flex items-center gap-2 hover:text-antiqueGold transition transform hover:scale-110"
                >
                  <UserCircle2 strokeWidth={1.5} />
                </Link>

                {/* Logout */}
                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="flex items-center gap-2 hover:text-red-500 transition transform hover:scale-110"
                  title="Logout"
                >
                  <LogOut size={20} strokeWidth={1.5} />
                </button>
              </div>
            )}
          </div>

          {/* ✅ MOBILE BUTTON */}
          <button
            className="md:hidden text-3xl text-richBlack"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>

        {/* ✅ MOBILE MENU */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out
          ${open ? "max-h-[800px] opacity-100 shadow-xl" : "max-h-0 opacity-0"}`}
        >
          <ul
            className="flex flex-col items-center gap-6 py-10 bg-ivory text-richBlack
            text-sm font-medium tracking-widest border-t border-gray-100"
          >
            {/* ✅ Category Links */}
            <li>
              <Link to="/products" onClick={() => setOpen(false)} className="hover:text-antiqueGold">
                All Jewellery
              </Link>
            </li>

            <li>
              <Link to="/products?category=Diamond" onClick={() => setOpen(false)} className="hover:text-antiqueGold">
                Diamond
              </Link>
            </li>

            <li>
              <Link to="/products?category=Earrings" onClick={() => setOpen(false)} className="hover:text-antiqueGold">
                Earrings
              </Link>
            </li>

            <li>
              <Link to="/products?category=Rings" onClick={() => setOpen(false)} className="hover:text-antiqueGold">
                Rings
              </Link>
            </li>

            <li>
              <Link to="/products?category=Necklace" onClick={() => setOpen(false)} className="hover:text-antiqueGold">
                Necklace
              </Link>
            </li>

            <li>
              <Link to="/products?category=Bangles" onClick={() => setOpen(false)} className="hover:text-antiqueGold">
                Bangles
              </Link>
            </li>

            {/* ✅ ADMIN LINK (Mobile) */}
            {isAdmin && (
              <li className="font-semibold bg-antiqueGold/10 px-4 py-2 rounded-lg text-antiqueGold">
                <Link to="/admin" onClick={() => setOpen(false)} className="flex items-center gap-2">
                  🛡️ Admin Dashboard
                </Link>
              </li>
            )}

            {/* ✅ Divider */}
            <div className="w-10/12 h-[1px] bg-gray-200"></div>

            {/* ✅ Profile / Orders / Logout if logged in */}
            {token ? (
              <>
                <li>
                  <Link to="/profile" onClick={() => setOpen(false)} className="hover:text-antiqueGold">
                    👤 Profile
                  </Link>
                </li>

                <li>
                  <Link to="/my-orders" onClick={() => setOpen(false)} className="hover:text-antiqueGold">
                    📦 My Orders
                  </Link>
                </li>

                <li>
                  <button
                    onClick={() => {
                      setShowLogoutModal(true);
                      setOpen(false);
                    }}
                    className="font-semibold hover:text-red-500 transition"
                  >
                    🚪 Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login" onClick={() => setOpen(false)} className="font-semibold text-antiqueGold">
                  🔐 Login
                </Link>
              </li>
            )}

            {/* ✅ Divider */}
            <div className="w-10/12 h-[1px] bg-gray-200"></div>

            {/* ✅ Mobile Icons (Fav + Cart) */}
            <div className="flex items-center gap-10 pt-2 text-richBlack">
              {/* ❤️ Favourite */}
              {/* ❤️ Favourite */}
              <button
                onClick={() => { handleFavouriteClick(); setOpen(false); }}
                className="relative hover:text-antiqueGold transition"
                title="Favourites"
              >
                <Heart className="w-6 h-6" strokeWidth={1.5} />

                {favs?.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-antiqueGold text-white text-[10px] px-1.5 py-0.5 rounded-full">
                    {favs.length}
                  </span>
                )}
              </button>

              {/* 🛒 Cart */}
              <button
                onClick={() => {
                  setOpen(false);

                  if (!token) {
                    localStorage.setItem("redirectAfterLogin", "/cart");
                    navigate("/login");
                  } else {
                    navigate("/cart");
                  }
                }}
                className="relative hover:text-antiqueGold transition"
              >
                <ShoppingCart className="w-6 h-6" strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-antiqueGold text-white text-[10px] px-1.5 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>

            </div>
          </ul>
        </div>
      </nav>

      {/* ✅ LOGOUT CONFIRM MODAL */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl border border-gray-100 transform transition-all scale-100">
            <h2 className="text-xl font-luxury font-semibold text-richBlack text-center">Confirm Logout</h2>
            <p className="text-sm text-gray-500 mt-3 text-center">
              Are you sure you want to end your session?
            </p>

            <div className="mt-8 flex gap-4 justify-center">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-6 py-2.5 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 transition text-sm font-medium"
              >
                Cancel
              </button>

              <button
                onClick={confirmLogout}
                className="px-6 py-2.5 rounded-full bg-richBlack text-white hover:bg-black transition shadow-lg text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ LOGIN REQUIRED MODAL */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl border border-gray-100">
            <h2 className="text-xl font-luxury font-semibold text-richBlack text-center">Login Required</h2>
            <p className="text-sm text-gray-500 mt-3 text-center">
              Please login to view your favourites ❤️
            </p>

            <div className="mt-8 flex gap-4 justify-center">
              <button
                onClick={() => setShowLoginModal(false)}
                className="px-6 py-2.5 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 transition text-sm font-medium"
              >
                Cancel
              </button>

              <button
                onClick={goToLogin}
                className="px-6 py-2.5 rounded-full bg-antiqueGold text-white hover:bg-opacity-90 transition shadow-lg text-sm font-medium"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}


    </>
  );
}
