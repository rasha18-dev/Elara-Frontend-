import {
  PhoneIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

export default function Footer() {
  return (
    <footer className="bg-champagne text-darkBrown py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* TOP */}
        <div className="grid gap-10 md:grid-cols-3">

          {/* BRAND */}
          <div>
            <h3 className="text-2xl font-luxury text-darkBrown">
              ELARA
            </h3>
            <p className="mt-4 text-sm text-darkBrown/80">
              Timeless jewellery crafted with elegance,
              purity, and modern luxury.
            </p>

            {/* SOCIAL ICONS */}
            <div className="flex gap-4 mt-6">

              {/* INSTAGRAM */}
              <a
                href="https://instagram.com"
                target="_blank"
                className="hover:text-softGold transition"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm4.25 5.5a4.75 4.75 0 1 0 0 9.5 4.75 4.75 0 0 0 0-9.5Zm6-1.75a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" />
                </svg>
              </a>

              {/* WHATSAPP */}
              <a
                href="https://wa.me/91XXXXXXXXXX"
                target="_blank"
                className="hover:text-softGold transition"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.4A10 10 0 1 0 12 2Z" />
                </svg>
              </a>

            </div>
          </div>

          {/* LINKS */}
          <div>
            <h4 className="text-lg font-luxury text-darkBrown mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-darkBrown/80">
              <li className="hover:text-softGold cursor-pointer">Home</li>
              <li className="hover:text-softGold cursor-pointer">Collections</li>
              <li className="hover:text-softGold cursor-pointer">Customization</li>
              <li className="hover:text-softGold cursor-pointer">Contact</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-lg font-luxury text-darkBrown mb-4">
              Contact
            </h4>

            <div className="flex items-center gap-3 text-sm text-darkBrown/80">
              <PhoneIcon className="w-5 h-5" />
              +91 XXXXXXXXXX
            </div>

            <div className="flex items-center gap-3 text-sm mt-3 text-darkBrown/80">
              <EnvelopeIcon className="w-5 h-5" />
              elara@gmail.com
            </div>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="border-t border-darkBrown/20 mt-12 pt-6 text-center text-sm text-darkBrown/70">
          © {new Date().getFullYear()} ELARA Jewellery. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
