"use client";
import { useRouter } from "next/navigation";

import { FormEvent } from "react";
export default function Home() {
  const router = useRouter();
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userId = (
      event.currentTarget.elements.namedItem("userId") as HTMLInputElement
    ).value;
    router.push(`/${userId}/record?matchtype=50`);
  };

  return (
    <div
      className="bg-white rounded-lg shadow p-6 w-6/12 flex items-center justify-center mx-auto"
      style={{
        minWidth: 640,
      }}
    >
      <form className="space-y-4" onSubmit={onSubmit}>
        <div className="flex items-center space-x-2 ">
          <input
            placeholder="구단주명"
            type="text"
            name="userId"
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <button
            type="submit"
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            style={{ minWidth: 100, marginBottom: 0 }}
          >
            검색
          </button>
        </div>
      </form>
    </div>
  );
}
