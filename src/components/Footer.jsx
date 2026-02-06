import { Link } from "react-router-dom";
import { PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

export default function Footer() {
  return (
    <footer className="relative bg-[#F9F6F0] text-[#121212] pt-24 pb-10 border-t border-[#8C7B6D]/10 overflow-hidden">

      {/* ✅ Ambient Glow (Light Theme) */}
      <div className="pointer-events-none absolute top-0 right-0 w-[600px] h-[600px] bg-[#E8DCCA]/20 blur-[100px] rounded-full" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#B08D55]/10 blur-[120px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6 mb-16">
        <div className="grid gap-8 md:grid-cols-12 md:gap-12">

          {/* ✅ BRAND - span 4 cols */}
          <div className="md:col-span-4 space-y-6">
            <h3 className="text-4xl font-luxury text-[#5D4037] tracking-wider cursor-default">
              RUMEA
            </h3>
            <p className="text-sm leading-relaxed max-w-sm font-light text-[#121212]/70">
              Timeless jewellery crafted with elegance, purity, and modern luxury. Designed to sparkle with every moment of your life.
            </p>

            {/* ✅ Social Icons */}
            <div className="flex gap-4 pt-2">
              {[
                { icon: "instagram", link: "https://instagram.com" },
                { icon: "whatsapp", link: "https://wa.me/917736952028" }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.link}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative w-10 h-10 flex items-center justify-center rounded-full border border-[#5D4037]/10 hover:border-[#B08D55] transition-all duration-300 hover:bg-[#B08D55] hover:text-white"
                >
                  <span className="sr-only">{social.icon}</span>
                  <svg className="w-4 h-4 text-[#5D4037] group-hover:scale-110 group-hover:text-white transition-all duration-300" fill="currentColor" viewBox="0 0 24 24">
                    {social.icon === "instagram" ? (
                      <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm4.25 5.5a4.75 4.75 0 1 0 0 9.5 4.75 4.75 0 0 0 0-9.5Zm6-1.75a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" />
                    ) : (
                      <path d="M20.52 3.48A11.87 11.87 0 0 0 12.03 0C5.39 0 .05 5.34.05 11.98c0 2.11.55 4.17 1.6 6L0 24l6.2-1.62a11.9 11.9 0 0 0 5.82 1.48h.01c6.63 0 11.98-5.34 11.98-11.98 0-3.2-1.25-6.21-3.49-8.4ZM12.03 21.5h-.01a9.9 9.9 0 0 1-5.05-1.39l-.36-.22-3.68.96.98-3.58-.24-.37a9.88 9.88 0 0 1-1.52-5.28c0-5.45 4.43-9.88 9.89-9.88a9.82 9.82 0 0 1 6.98 2.89 9.82 9.82 0 0 1 2.9 6.99c0 5.45-4.44 9.88-9.89 9.88Zm5.43-7.41c-.3-.15-1.77-.87-2.05-.97-.28-.1-.48-.15-.69.15-.2.3-.79.97-.97 1.17-.18.2-.36.22-.66.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.8-1.67-2.1-.18-.3-.02-.46.13-.61.13-.13.3-.36.45-.54.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.08-.15-.69-1.65-.95-2.27-.25-.6-.5-.52-.69-.53h-.59c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5 0 1.47 1.08 2.89 1.23 3.09.15.2 2.13 3.25 5.17 4.56.72.31 1.28.5 1.72.64.72.23 1.37.2 1.88.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.18-1.42-.08-.12-.28-.2-.58-.35Z" />
                    )}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* ✅ LINKS - span 2 cols */}
          <div className="md:col-span-2">
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#5D4037] mb-6 border-b border-[#B08D55]/30 pb-2 inline-block">
              Explore
            </h4>
            <ul className="space-y-4 text-sm font-light text-[#121212]/70">
              {['Home', 'Collections', 'My Profile', 'My Orders'].map((item) => (
                <li key={item}>
                  <Link
                    to={item === 'Home' ? '/' : item === 'Collections' ? '/products' : item === 'My Profile' ? '/profile' : '/my-orders'}
                    className="hover:text-[#B08D55] transition duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#B08D55] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="group-hover:translate-x-1 transition-transform">{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ✅ CONTACT - span 3 cols */}
          <div className="md:col-span-3">
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#5D4037] mb-6 border-b border-[#B08D55]/30 pb-2 inline-block">
              Contact
            </h4>
            <div className="space-y-6 text-sm font-light text-[#121212]/70">
              <div className="flex items-start gap-4 group">
                <div className="p-2.5 rounded-full border border-[#5D4037]/10 bg-white group-hover:bg-[#B08D55] transition-colors duration-300">
                  <PhoneIcon className="w-4 h-4 text-[#B08D55] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-[10px] text-[#5D4037]/60 uppercase tracking-widest mb-1">Call Us</p>
                  <span className="text-[#121212] font-medium group-hover:text-[#B08D55] transition cursor-pointer">+91 7736952028</span>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="p-2.5 rounded-full border border-[#5D4037]/10 bg-white group-hover:bg-[#B08D55] transition-colors duration-300">
                  <EnvelopeIcon className="w-4 h-4 text-[#B08D55] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-[10px] text-[#5D4037]/60 uppercase tracking-widest mb-1">Email Us</p>
                  <span className="text-[#121212] font-medium group-hover:text-[#B08D55] transition cursor-pointer">rumea@gmail.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* ✅ NEWSLETTER - span 3 cols */}
          <div className="md:col-span-3">
            <h4 className="text-sm font-bold uppercase tracking-widest text-[#5D4037] mb-6 border-b border-[#B08D55]/30 pb-2 inline-block">
              Newsletter
            </h4>
            <p className="text-sm font-light text-[#121212]/70 mb-6 leading-relaxed">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Subscribed ✅");
              }}
              className="group relative"
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="w-full px-5 py-3.5 text-sm text-[#121212] bg-white border border-[#5D4037]/20 rounded-sm outline-none focus:border-[#B08D55] transition-colors placeholder:text-[#5D4037]/30 shadow-sm"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 bg-[#B08D55] text-white px-5 text-xs font-bold uppercase tracking-wider hover:bg-[#5D4037] transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ✅ Bottom Bar */}
      <div className="border-t border-[#5D4037]/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row gap-4 items-center justify-between text-xs text-[#5D4037]/60 font-medium">
          <p>© {new Date().getFullYear()} RUMEA. All rights reserved.</p>
          <div className="flex gap-8">
            <span className="hover:text-[#B08D55] cursor-pointer transition">Privacy</span>
            <span className="hover:text-[#B08D55] cursor-pointer transition">Terms</span>
            <span className="hover:text-[#B08D55] cursor-pointer transition">Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
