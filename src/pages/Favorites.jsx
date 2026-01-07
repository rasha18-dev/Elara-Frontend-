export default function Favorite() {
  return (
    <div className="max-w-7xl mx-auto px-8 py-10">
      <h1 className="text-2xl font-semibold text-[#4A1F2D] mb-6">
        My Favourites ❤️
      </h1>

      {/* EMPTY STATE */}
      <div className="text-gray-500 text-sm">
        No favourite items yet.
      </div>
    </div>
  );
}
