"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import data from "../properties.json";
import CategoryCard from "./CategoryCard";

const categoryMap = {
  1: "All",
  2: "Curry Cut",
  3: "Boneless",
  4: "Premium Cuts",
  5: "Offals",
};

function filterCards(id) {
  if (id == 1) {
    return data;
  } else {
    return data.filter((card) => card.category_id === id);
  }
}

export default async function HomeProperties() {
  const router = useSearchParams();
  const id = router.get("id") != null ? router.get("id") : 1;

  let cards = filterCards(id);

  return (
    <>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">
            {categoryMap[id]}
          </h2>
          {
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cards.map((card) => (
                <CategoryCard key={card._id} category={card} />
              ))}
            </div>
          }
        </div>
      </section>
    </>
  );
}
