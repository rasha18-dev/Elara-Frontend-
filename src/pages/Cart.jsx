export default function Cart() {
  return (
    <section className="bg-ivory py-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">

        <h1 className="text-3xl font-luxury text-darkBrown mb-10">
          My Cart
        </h1>

        <div className="bg-white rounded-3xl p-6 shadow mb-6">
          <div className="flex justify-between items-center">
            <p className="font-luxury">Gold Ring</p>
            <p className="text-softGold">₹25,000</p>
          </div>
        </div>

        <button className="bg-darkBrown text-ivory px-8 py-3 rounded-full">
          Proceed to Checkout
        </button>

      </div>
    </section>
  );
}
