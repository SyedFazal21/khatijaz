"use client";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useState } from "react";
import {
  addToCart,
  removeFromCart,
  getCurrentItemCount,
} from "../../service/cartService";

let card;

export default function CardDetails() {
  let [data, setData] = useState([]);
  const router = useSearchParams();
  const id = router.get("id") != null ? router.get("id") : 1;
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    
    const fetchItems = async () => {
      const res = await fetch(
        `/api/items`
      );
      
      if (res.status === 200) {
        const result = await res.json();
        setData(result);
        card = result.filter((card) => card._id === id)[0];
        setItemCount(getCurrentItemCount(card._id));
      }
    };

    fetchItems();
  }, [itemCount]);

  return card && ( 
    <div className="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4">
      <div className="xl:w-2/6 lg:w-2/5 w-80 md:block hidden">
        <img className="w-full" alt="image of chicken" src={card.images[0]} />
        <img
          className="mt-6 w-full"
          alt="image of a girl posing"
          src={card.images[0]}
        />
      </div>
      <div className="md:hidden">
        <img className="w-full" alt="image of chicken" src={card.images[0]} />
      </div>
      <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
        <div className="border-b border-gray-200 pb-6">
          <h1 className="lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 text-gray-800 dark:text-black mt-2">
            {card.name}
          </h1>
        </div>
        <div>
          <p className="xl:pr-48 text-base lg:leading-tight leading-normal text-gray-600 dark:text-gray-700 mt-7">
            {card.description}
          </p>
          <p className="text-base leading-4 mt-7 text-gray-600 dark:text-gray-700">
            Total Energy: 127 Kcal
          </p>
          <p className="text-base leading-4 mt-4 text-gray-600 dark:text-gray-700">
            Carbohydrate: 0 g
          </p>
          <p className="text-base leading-4 mt-4 text-gray-600 dark:text-gray-700">
            Fat: 4.5 g
          </p>
          <p className="text-base leading-4 mt-4 text-gray-600 dark:text-gray-700">
            Protein: 21.6 g
          </p>
          <p className="md:w-96 text-base leading-normal text-gray-600 dark:text-gray-700 mt-4">
            We do not freez the meet
          </p>
          <div className="flex justify-between mt-5">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-black-400">
              ₹{card.price}
            </h5>
            {itemCount > 0 && (
              <div className="flex items-center gap-2">
                <button
                  href="#"
                  onClick={() => setItemCount(removeFromCart(card._id))}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-50 rounded-lg hover:bg-red-800 focus:outline-none dark:bg-red-500 dark:hover:bg-red-700"
                >
                  <FaMinus className="ml-2" />
                </button>
                <span className="font-bold text-xl">{itemCount}</span>
                <button
                  href="#"
                  onClick={() => setItemCount(addToCart(card._id))}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-50 rounded-lg hover:bg-red-800 focus:outline-none dark:bg-red-500 dark:hover:bg-red-700"
                >
                  <FaPlus className="ml-2" />
                </button>
              </div>
            )}
            {itemCount == 0 && (
              <button
                href="#"
                onClick={() => setItemCount(addToCart(card._id))}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:outline-none dark:bg-red-600 dark:hover:bg-red-700"
              >
                Add
                <FaPlus className="ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
   );
}
