"use client";

import { useRouter } from "next/navigation";
import React, { FormEvent } from "react";

function SearchUser() {
  const router = useRouter();
  console.log(router);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userId = (
      e.currentTarget.elements.namedItem("userId") as HTMLInputElement
    ).value;
    // router.push(`/record/${userId}`);
  };
  return (
    <div
      className="bg-black rounded-lg shadow p-6 w-full flex items-center justify-center"
      style={{
        minWidth: 640,
      }}
    >
      <form className="flex items-center space-x-2" onSubmit={onSubmit}>
        <input
          className=" text-black"
          type="text"
          name="userId"
          placeholder="Enter user ID"
          required
        />
        <button type="submit" className="color-accent">
          FC
        </button>
      </form>
    </div>
  );
}

export default SearchUser;
