"use client";
import Image from "next/image";
import { FaRegCalendarAlt } from "react-icons/fa";
import { popularPosts } from "@/Data/dogsData";
export default function BlogSidebar() {
  const categories = [
    { name: "Dog Care", count: 285 },
    { name: "Cat Care", count: 46 },
    { name: "Small Pets", count: 16 },
  ];

  return (
    <aside className="w-full  px-4">
      {/* Categories */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 border-b pb-2">Categories</h3>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li
              key={cat.name}
              className="flex gap-2 font-semibold text-sm hover:text-[#018F98] cursor-pointer"
            >
              <span>{cat.name}</span>
              <span>({cat.count})</span>
            </li>
          ))}
        </ul>
      </div>
      <Image
        src="/walking_ad.jpg"
        alt="Ads"
        width={600}
        height={200}
        className="mb-6"
      />

      {/* Popular Posts */}
      <div>
        <h3 className="text-lg font-semibold mb-4 border-b pb-2">
          Popular Posts
        </h3>
        <div className="space-y-4">
          {popularPosts.map((post) => (
            <div key={post.title} className="flex gap-3 items-start">
              <div className="w-[80px] h-[60px] relative flex-shrink-0">
                <Image
                  src={post.img}
                  alt={post.title}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <div>
                <p className="text-sm font-medium hover:text-[#018F98] cursor-pointer leading-tight">
                  {post.title}
                </p>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <FaRegCalendarAlt className="mr-1" />
                  {post.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
