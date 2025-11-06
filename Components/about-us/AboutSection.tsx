export default function AboutSection() {
  return (
    <section className="w-full bg-white py-6">
      {/* Top Info Row */}
      <div className="flex flex-wrap items-center justify-center gap-8 pb-6 text-lg">
        {/* Item 1 */}
        <div className="flex items-center space-x-2">
          <span className="text-teal-600 text-2xl">🍃</span>
          <p className="text-gray-700 font-semibold">
            VACCINATED & INSURED PETS
          </p>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-6 bg-gray-300"></div>

        {/* Item 2 */}
        <div className="flex items-center space-x-2">
          <span className="text-teal-600 text-2xl">🐾</span>
          <p className="text-gray-700 font-semibold">
            <span className="text-[#018F98]">100+</span> HAPPY FAMILIES
          </p>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-6 bg-gray-300"></div>

        {/* Item 3 */}
        <div className="flex items-center space-x-2">
          <span className="text-teal-600 text-2xl">🐕</span>
          <p className="text-gray-700 font-semibold">RESPONSIBLE BREEDERS</p>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-6 bg-gray-800"></div>

        {/* Item 4 */}
        <div className="flex items-center space-x-2">
          <span className="text-teal-600 text-2xl">🐶</span>
          <p className="text-gray-700 font-semibold">
            <span className="text-[#018F98]">50+</span> BREEDS
          </p>
        </div>
      </div>

      {/* About Us Section */}
      <div className="max-w-6xl mx-auto mt-10 px-6 text-center">
        {/* Title */}
        <div className="bg-[#018F98] block px-8 py-2 rounded-md mb-8">
          <h2 className="text-white text-xl font-semibold block">About Us</h2>
        </div>

        {/* Description */}
        <div className="text-black text-sm leading-relaxed text-left space-y-3">
          <p>
            <strong>Mr n Mrs Pet</strong> has been established with the aim to
            provide one stop solution for pet lovers. Being a pet lover we
            understand that “a house is not home without paw prints” and here we
            help you find that friendly companion for you.
          </p>

          <p>
            But journey of a pet lover does not stop with being a pet parent; it
            brings much more responsibility with it. Taking care of your pet and
            keeping them healthy is as important as loving them. This means that
            what so ever you and your pet or you are into we too are into it. Be
            it taking your pet on a walk or filing their nails or when it’s time
            for your pet to meet its vet or when your pet is looking for his/her
            date.
          </p>

          <p>
            We are committed in making pet care safe, affordable and easy for
            every pet parent so that they can enjoy the unconditional love of
            their pet.
          </p>

          <p className="font-medium ">
            “Love of pet is unconditional... Let’s feel the awesomeness!!!"
          </p>
        </div>
      </div>
    </section>
  );
}
