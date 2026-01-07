import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchBar() {
  return (
    <div className="w-full bg-white border-b border-gray-200">
      <div className="max-w-sm mx-auto px-6 py-3 flex justify-center">
        <div className="relative w-full max-w-xl">

          {/* 🔍 Lens icon */}
          <button
            type="button"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#4A1F2D]"
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>

          {/* Input field */}
          <input
            type="text"
            placeholder="Search jewellery, gold, diamond..."
            className="
              w-full
              pl-12 pr-4 py-2
              border border-gray-300
              rounded-full
              text-sm
              focus:outline-none
              focus:ring-1 focus:ring-[#4A1F2D]
            "
          />
        </div>
      </div>
    </div>
  );
}
