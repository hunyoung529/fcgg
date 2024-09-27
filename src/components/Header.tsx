"use client";
import Link from "next/link";
import { FormEvent } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const isMainPage = pathname === "/";

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const inputElement = event.currentTarget.elements.namedItem(
      "userId"
    ) as HTMLInputElement;
    const trimmedUserId = inputElement.value.trim();
    router.push(`/${trimmedUserId}/record?matchtype=50`);
  };

  return (
    <header className="h-10v  flex items-center justify-between max-w-7xl mx-auto max-[600px]:max-w-[600px] max-[600px]:flex-col max-[600px]:mb-2">
      <Link
        href="/"
        className="text-4xl text-[#0aff60] ml-5  font-logo font-bold "
      >
        ADARI
      </Link>
      {!isMainPage && (
        <form className="space-y-4 w-[320px]" onSubmit={onSubmit}>
          <div className="flex items-center space-x-2">
            <input
              placeholder="구단주명"
              type="text"
              name="userId"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full min-w-[200px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
      )}
    </header>
  );
}
