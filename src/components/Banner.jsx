 export default function Banner(){
           return(
      <section className="w-full h-[70vh] relative">
        
        {/* BACKGROUND IMAGE */}
        <img
          src="/secondbanner.webp"
          alt="Elara Jewellery Banner"
          className="w-full h-full object-cover"
        />

      
        <div className="absolute inset-0 bg-black/30"></div>

        {/* TEXT CONTENT */}
        {/* <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-wide">
            Timeless Jewellery
          </h1>

          <p className="mt-4 text-lg max-w-xl">
            Discover elegant gold & diamond jewellery crafted for every moment
          </p>

          <button className="mt-6 px-8 py-3 bg-[#4A1F2D] text-white rounded-full hover:opacity-90 transition">
            Shop Now
          </button>
        </div> */}

      </section>
 )}