import React from "react";

export default function SearchBar(props) {
  const { showSearch } = props;
  const height = "50px";

  return (
    <div
      className={`w-screen transease ${
        showSearch ? `min-h-${height} p-4` : "min-h-0"
      } bg-blue-100 z-[50]`}
    >
      <div
        className={`flex flex-col items-center justify-center ${
          showSearch ? "" : ""
        } `}
      >
        <input
          type={"text"}
          placeholder={'Search by artist, album, or genre...'}
          className={`w-10/12 rounded-full drop-shadow-md p-2 pl-4 pr-4`}
          hidden={!showSearch}
        />
      </div>
    </div>
  );
}
