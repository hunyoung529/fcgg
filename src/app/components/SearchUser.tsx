import React from "react";

function SearchUser() {
  return (
    <div
      className="bg-black rounded-lg shadow p-6 w-full flex items-center justify-center"
      style={{
        minWidth: 640,
      }}
    >
      <form className="flex items-center space-x-2">
        <input
          className=" text-black"
          type="text"
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
