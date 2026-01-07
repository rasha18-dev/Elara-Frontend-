export default function SectionLatest(){
     return (
    <section className="bg-ivory py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* SECTION HEADER */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-luxury text-mocha">
            Latest Collections
          </h2>
          <p className="mt-3 text-mocha/70 text-sm md:text-base">
            Discover our newest designs crafted with elegance and precision
          </p>
        </div>

        {/* COLLECTION GRID */}
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">

          {/* CARD 1 */}
         <div className="
  bg-white/60
  rounded-3xl
  p-6
  shadow-md
  border border-transparent
  hover:border-antiqueGold
  transition-all duration-300
">
            <img
              src="/Ring.jpg"
              alt=" Rings"
              className="rounded-2xl h-64 w-full object-cover mb-6"
            />
            <h3 className="text-lg font-luxury text-mocha">
               Rings
            </h3>
          
          </div>

          {/* CARD 2 */}
         <div className="
  bg-white/60
  rounded-3xl
  p-6
  shadow-md
  border border-transparent
  hover:border-antiqueGold
  transition-all duration-300
">
            <img
              src="/nekalace.jpg"
              alt="Diamond Necklace"
              className="rounded-2xl h-64 w-full object-cover mb-6"
            />
            <h3 className="text-lg font-luxury text-mocha">
               Necklace
           </h3>
          </div>

          {/* CARD 3 */}
          <div className="
  bg-white/60
  rounded-3xl
  p-6
  shadow-md
  border border-transparent
  hover:border-antiqueGold
  transition-all duration-300
">
            <img
              src="/earings.jpg"
              alt="Elegant Earrings"
              className="rounded-2xl h-64 w-full object-cover mb-6"
            />
            <h3 className="text-lg font-luxury text-mocha">
              Elegant Earrings
            </h3>
           
          </div>
 <div className="
  bg-white/60
  rounded-3xl
  p-6
  shadow-md
  border border-transparent
  hover:border-antiqueGold
  transition-all duration-300
">
            <img
              src="/anklets.jpg"
              alt="Anklets"
              className="rounded-2xl h-64 w-full object-cover mb-6"
            />
            <h3 className="text-lg font-luxury text-mocha">
                Anklets
            </h3>
           
          </div>
        </div>
      </div>
    </section>
  );
}