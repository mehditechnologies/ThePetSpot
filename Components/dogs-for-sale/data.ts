// data.ts
export const pets = [
  {
    id: 1,
    name: "Rio",
    img: "/pets/image1.jpg",
    breed: "Labrador Retriever",
    gender: "Male",
    age: "8 Weeks",
    city: "Lahore",
  },
  {
    id: 2,
    name: "Rockie",
    img: "/pets/image2.webp",
    breed: "Labrador Retriever",
    gender: "Male",
    age: "6 Weeks",
    city: "Karachi",
  },
  {
    id: 3,
    name: "Luna",
    img: "/pets/image3.webp",
    breed: "Labrador Retriever",
    gender: "Female",
    age: "10 Weeks",
    city: "Islamabad",
  },
];

export const popularBreeds = [
  "Labrador Retriever",
  "German Shepherd",
  "Golden Retriever",
  "Pomeranian",
  "Beagle",
  "Husky",
  "Bulldog",
  "Pug",
];

export const breeds = [
  "Labrador Retriever",
  "Golden Retriever",
  "German Shepherd",
  "Pug",
  "Beagle",
  "Bulldog",
  "Rottweiler",
  "Poodle",
  "Siberian Husky",
  "Doberman",
];

export const statesWithCities: Record<string, string[]> = {
  Maharashtra: ["Mumbai", "Pune", "Nagpur"],
  Delhi: ["New Delhi", "Dwarka", "Rohini"],
  Karnataka: ["Bengaluru", "Mysuru", "Mangalore"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Noida"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
};
