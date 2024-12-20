import React, { useState, useEffect } from "react";
import { getPriceById } from "@/service/productService";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';

export default function Modal({ setModal }) {
  const router = useRouter();
  const [error, setError] = useState("");
  let [data, setData] = useState([]);
  let total = 0;

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

    fetchItems();
  }, []);

  const placeOrder = async () => {
    const user = localStorage.getItem('LoggedInUserDetails');
    const cart = localStorage.getItem('cartItemsSelected');
    const location = localStorage.getItem('location');

    if(!user || !cart) {
      setError("Something went wrong");
      return;
    }

    const userDetails = JSON.parse(user);
    const cartItems = JSON.parse(cart);
    const product_ids = cartItems.map((item) => item.id);
    const product_quantity = cartItems.map((item) => item.quantity);
    cartItems.map((item) => {
      total += getPriceById(item.id, data) * item.quantity;
    })

    const orderPayload = {
      user_id: userDetails._id,
      product_ids,
      product_quantity,
      Order_total: total,
      status: 'Preparing',
      address: userDetails.address,
      location
    }

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderPayload),
    });

    if(res.status === 200) {
      toast.success('Order Created Successfully!');
      localStorage.removeItem('cartItemsSelected');
      router.push('/orders');
    } else {
      toast.error('Order failed!');
      setModal(false);
    }
  };
  return (
    <div
      id="popup-modal"
      tabIndex="-1"
      className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="popup-modal"
          >
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-4 md:p-5 text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Pay at your doorstep with cash or UPI. <br />
              Are you sure you want to place your Order?
            </h3>
            <button
              data-modal-hide="popup-modal"
              type="button"
              onClick={placeOrder}
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
            >
              Yes, I'm sure
            </button>
            <button
              data-modal-hide="popup-modal"
              type="button"
              onClick={() => setModal(false)}
              className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
