import React, { useContext, useEffect, useRef, useState } from "react";
import AlbumContext from "../AlbumContext";
import Fuse from "fuse.js";
import SVG from "./SVG";

export default function SearchBar(props) {
  const { showSearch } = props;
  const { masterInventory, setActiveAlbum } = useContext(AlbumContext);
  const height = "50px";
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const options = {
    keys: ["name", "metadata.album", "metadata.artist"],
    threshold: 0.1,
    minMatchCharLength: 3,
  };

  const fuse = new Fuse(masterInventory, options);

  useEffect(() => {
    setResults(fuse.search(searchTerm));
  }, [searchTerm]);

  useEffect(() => {
    if (!showSearch) {
      setSearchTerm("");
      setResults([]);
    }
  }, [showSearch]);

  return (
    <>
      <div
        className={`w-screen transease ${
          showSearch ? `min-h-${height} p-4` : "min-h-0"
        } bg-blue-100 z-[50]`}
      >
        <div
          className={`flex items-center gap-4 justify-center ${
            showSearch ? "" : ""
          } `}
        >
          <input
            type={"text"}
            placeholder={"Search by artist, album, or genre..."}
            className={`w-10/12 rounded-full drop-shadow-md p-2 pl-4 pr-4`}
            hidden={!showSearch}
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <button children={"Clear"} className={'uppercase font-light'} onClick={() => {setSearchTerm('')}} />
        </div>
      </div>

      <div className="z-[50] bg-blue-200 w-full items-center justify-center flex">
        <div className="flex flex-col items-center justify-center">
          {results?.map((album, index) => {
            return (
              <div
                key={index}
                onClick={() => setActiveAlbum(album.item)}
                className={"flex p-2 cursor-pointer items-center gap-4"}
              >
                <img src={album.item.image} className={"max-w-[50px]"} />
                <div className="flex flex-col justify-center items-start">
                  <span className="font-bold">{album.item.metadata.album}</span>
                  <span>{album.item.metadata.artist}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
