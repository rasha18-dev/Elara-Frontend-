import { useEffect, useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
      bg-ivory text-mocha border-b border-antiqueGold/40
      ${scrolled ? "shadow-md" : ""}`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 h-16">

        {/* LOGO */}
        <h1 className="text-2xl font-luxury text-softBrown">
          ELARA
        </h1>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex gap-8 text-sm tracking-wider text-mocha">
          <li className="hover:text-antiqueGold cursor-pointer transition">
            All Jewellery
          </li>
          <li className="hover:text-antiqueGold cursor-pointer transition">
            Diamond
          </li>
          <li className="hover:text-antiqueGold cursor-pointer transition">
            Earrings
          </li>
          <li className="hover:text-antiqueGold cursor-pointer transition">
            Rings
          </li>
          <li className="hover:text-antiqueGold cursor-pointer transition">
            Necklaces
          </li>
          <li className="hover:text-antiqueGold cursor-pointer transition">

            Bangles
          </li>
          
        </ul>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden text-3xl text-softBrown"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU (SLIDE + LUXURY COLORS) */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out
        ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <ul className="
          flex flex-col items-center gap-6 py-8
          bg-champagne text-mocha
          text-sm tracking-wider
          border-t border-antiqueGold/40
        ">
          <li className="hover:text-antiqueGold cursor-pointer">All Jewellery</li>
          <li className="hover:text-antiqueGold cursor-pointer">Rings</li>
          <li className="hover:text-antiqueGold cursor-pointer">Earrings</li>
          <li className="hover:text-antiqueGold cursor-pointer">Necklace</li>
          <li className="hover:text-antiqueGold cursor-pointer">Bangles</li>
        </ul>
      </div>
    </nav>
  );
}
