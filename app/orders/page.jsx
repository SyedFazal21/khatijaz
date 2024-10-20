"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getNameById } from "@/service/productService";
import Pagination from "@/components/Pagination";

export default function page() {
  const router = useRouter();
  let [orders, setOrders] = useState([]);
  let user_id = "";

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [totalItems, setTotalItems] = useState(0);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    const user = localStorage.getItem("LoggedInUserDetails");

    if (user) {
      user_id = JSON.parse(user)._id;
    } else {
      router.push("/login");
    }

    const fetchOrders = async () => {
      const res = await fetch(
        `/api/orders/${user_id}?page=${page}&pageSize=${pageSize}`
      );

      if (res.status === 200) {
        const data = await res.json();
        setOrders(data.orders);
        setTotalItems(data.total);
        console.log("Total", data.total);
      }
    };

    fetchOrders();
  }, [page, pageSize]);

  return (
    <div className="bg-white p-8 rounded-md w-full">
      <div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          {orders.length > 0 && (
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((item) => (
                    <tr>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {getNameById(item.product_ids[0])}
                              {item.product_ids.length > 1 && (
                                <span>.....</span>
                              )}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {item.Order_total}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                          <span
                            aria-hidden
                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                          ></span>
                          <span className="relative">{item.status}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                page={page}
                pageSize={pageSize}
                totalItems={totalItems}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
