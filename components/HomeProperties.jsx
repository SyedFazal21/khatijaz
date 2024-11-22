"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import CategoryCard from "./CategoryCard";

let cards = [];
let id = 1;

const categoryMap = {
  1: "All",
  2: "Curry Cut",
  3: "Boneless",
  4: "Premium Cuts",
  5: "Offals",
};

export default async function HomeProperties() {
  let [data, setData] = useState([]);
  let [categories, setCategories] = useState([]);

  function filterCards() {
    const router = useSearchParams();
    id = router.get("id") != null ? router.get("id") : 1;
  
    if (id == 1) {
      return data;
    } else {
      return data.filter((card) => card.category_id === id);
    }
  }

  function getCategoryName(category_id) {
    const category = categories.filter((category) => category.category_id == category_id )[0];
    return category?.name;
  }

  useEffect(() => {
    const fetchItems = async () => {
      const res = await fetch(
        `/api/items`
      );

      if (res.status === 200) {
        const result = await res.json();
        setData(result);
      }
    };

    const fetchCategories = async () => {
      const res = await fetch(
        `/api/categories`
      );

      if (res.status === 200) {
        const result = await res.json();
        setCategories(result);
      }
    };

    fetchItems();
    fetchCategories();
  }, []);

  cards = filterCards();

  return (
    <>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">
            {getCategoryName(id)}
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
