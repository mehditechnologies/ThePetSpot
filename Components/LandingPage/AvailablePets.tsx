"use client";
import { useRouter } from "next/navigation";

export default function AvailablePets() {
  const images = [
    { src: "/pets/image1.jpg", name: "Buddy" },
    { src: "/pets/image2.webp", name: "Milo" },
    { src: "/pets/image3.webp", name: "Luna" },
    { src: "/pets/image4.webp", name: "Charlie" },
    { src: "/pets/image5.webp", name: "Bella" },
  ];
  const router = useRouter();

  return (
    <section className="bg-[#028d8f] py-12 text-center text-white mt-0 px-44">
      <div className=" mx-auto px-6">
        <h2 className="text-3xl font-semibold mb-2">Available Pets</h2>
        <p className="text-sm mb-8">Explore and choose your perfect pet.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
          {images.map((img, i) => (
            <div
              key={i}
              className="bg-white overflow-hidden shadow-md transform hover:scale-105 transition"
            >
              <img
                src={img.src}
                alt={img.name}
                className="w-full h-56 object-cover"
              />
              <h2 className="text-center font-semibold text-white bg-[#008080] py-2">
                {img.name}
              </h2>
            </div>
          ))}
        </div>
        <div
          onClick={() => {
            router.push("/dogs/for-sale");
          }}
          className="px-3 py-1 bg-[#028d8f] hover:bg-[#00595F] hover:cursor-pointer border-2 inline "
        >
          View More Puppies
        </div>
      </div>
    </section>
  );
}
