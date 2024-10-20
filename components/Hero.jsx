"use client"
import React from "react";
import Link from "next/link";
import Image from "next/image";
import all from "@/assets/images/curry-cut.webp";
import curryCut from "@/assets/images/curry-cut.webp";
import premium from "@/assets/images/premium.webp";
import { useSearchParams } from "next/navigation";
import boneless from "@/assets/images/boneless.webp";
import offal from "@/assets/images/offals.webp";

const categories = [
  {
    id: 1,
    image: all,
    name: "All",
  },
  {
    id: 2,
    image: curryCut,
    name: "Curry Cut",
  },
  {
    id: 3,
    image: boneless,
    name: "Boneless",
  },
  {
    id: 4,
    image: premium,
    name: "Premium Cuts",
  },
  ,
  {
    id: 5,
    image: offal,
    name: "Offals",
  },
];

export default function Hero() {
  const router = useSearchParams();
  const id = router.get("id");

  return (
    <div className="text-sm font-medium text-center flex justify-center text-gray-500 border-b bg-red-50 border-gray-200 dark:text-gray-400 dark:border-gray-700">
      <ul className="flex flex-wrap -mb-px">
        {categories.map((cat) => (
          <li key={cat.id} className="">
            <Link
              href={`/chicken?id=${cat.id}`}
              className={`inline-block p-4 text-black border-b-2 border-blue-600 ${id == cat.id ? 'border-b-2 border-b-red-500' : ''} rounded-t-lg dark:text-black-500`}
            >
              <Image
                className="h-20 w-auto"
                src={cat.image}
                alt="PropertyPulse"
              />
              <span className="text-lg">{cat.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
