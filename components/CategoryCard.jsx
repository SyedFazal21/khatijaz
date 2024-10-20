import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import {
  addToCart,
  removeFromCart,
  getCurrentItemCount,
} from "@/service/cartService";

export default function CategoryCard({ category }) {
  const router = useRouter();
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    setItemCount(getCurrentItemCount(category._id));
  }, [itemCount]);

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg cursor-pointer shadow dark:fff dark:border-gray-700">
      <Image
        src={category.images[0]}
        onClick={() => router.push(`/carddetails?id=${category._id}`)}
        alt=""
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        className="w-auto h-30 rounded-t-xl"
      />
      <div className="p-5">
        <a href="#">
          <h5
            onClick={() => router.push(`/carddetails?id=${category._id}`)}
            className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-black-400"
          >
            {category.name}
          </h5>
        </a>
        <p
          onClick={() => router.push(`/carddetails?id=${category._id}`)}
          className="mb-3 font-normal text-gray-700 dark:text-black-400"
        >
          {category.weight} | {category.pieces} | Serves {category.serves}
        </p>
        <div className="flex justify-between">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-black-400">
            ₹{category.price}
          </h5>
          {itemCount > 0 && (
            <div className="flex items-center gap-2">
              <button
                href="#"
                onClick={() => setItemCount(removeFromCart(category._id))}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-50 rounded-lg hover:bg-red-800 focus:outline-none dark:bg-red-500 dark:hover:bg-red-700"
              >
                <FaMinus className="ml-2" />
              </button>
              <span className="font-bold text-xl">{itemCount}</span>
              <button
                href="#"
                onClick={() => setItemCount(addToCart(category._id))}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-50 rounded-lg hover:bg-red-800 focus:outline-none dark:bg-red-500 dark:hover:bg-red-700"
              >
                <FaPlus className="ml-2" />
              </button>
            </div>
          )}
          {itemCount == 0 && (
            <button
              href="#"
              onClick={() => setItemCount(addToCart(category._id))}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:outline-none dark:bg-red-600 dark:hover:bg-red-700"
            >
              Add
              <FaPlus className="ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
