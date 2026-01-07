export default function Wishlist() {
  return (
    <section className="bg-ivory py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-3xl font-luxury text-darkBrown mb-10">
          Wishlist
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl p-6 shadow">
            <img src="/product1.jpg" className="rounded-2xl mb-4" />
            <h3 className="font-luxury text-darkBrown">
              Gold Ring
            </h3>
          </div>
        </div>

      </div>
    </section>
  );
}
