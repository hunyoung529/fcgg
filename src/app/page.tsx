"use client";

import { useRouter } from "next/navigation";
import { FormEvent } from "react";
export default function Home() {
  const router = useRouter();
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const inputElement = event.currentTarget.elements.namedItem(
      "userId"
    ) as HTMLInputElement;
    const trimmedUserId = inputElement.value.trim();

    router.push(`/${trimmedUserId}/record?matchtype=50`);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow p-6 w-6/12 flex flex-col items-center justify-center mx-auto my-12 min-w-[640px]">
        <form className="space-y-4 w-full" onSubmit={onSubmit}>
          <div className="flex items-center space-x-2">
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
      <div
        className="bg-white rounded-lg shadow px-6 py-4 w-6/12 mx-auto my-8"
        style={{ minWidth: 640 }}
      >
        <h2 className="text-gray-900 text-lg font-semibold mb-2">
          구단주명으로 전적을 검색해보세요. 예: 리바이브인호, KDF김시경
        </h2>
        <h2 className="text-gray-900 text-lg font-semibold">
          구단주명 검색 사이트:
          <a
            href="https://fconline.nexon.com/datacenter/rank"
            className="underline text-blue-800 hover:text-blue-600"
          >
            여기를 클릭하세요
          </a>
        </h2>
      </div>
    </>
  );
}
