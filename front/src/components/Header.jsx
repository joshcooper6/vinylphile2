import { faRecordVinyl } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import SVG from "./SVG";
import AlbumContext from "../AlbumContext";
import SearchBar from "./SearchBar";

export default function Header() {
  const { showCart, setShowCart } = useContext(AlbumContext);

  let img =
    "https://en.wikipedia.org/wiki/List_of_tallest_buildings_in_Seattle#/media/File:Downtown_Seattle_skyline_from_Kerry_Park_-_October_2019.jpg";

  return (
    <>
      <div className="flex z-[50] w-screen drop-shadow-md justify-between bg-blue-900">
        <div className="logo flex p-5 items-center text-blue-200 select-none justify-center">
          <FontAwesomeIcon icon={faRecordVinyl} className={"text-5xl p-2"} />
          <h1 className="lowercase tracking-tighter text-6xl">Vinylphile</h1>
        </div>

        <SVG
          setState={setShowCart}
          svgShape={showCart ? "cancel" : "shoppingCart"}
          styles={"fill-blue-200 scale-125 mr-6"}
        />
      </div>

      <SearchBar />

      <div
        id="seattle"
        className={`h-[300px] flex flex-col items-center justify-center w-screen`}
      >   
        <h2 className="text-white opacity-100 z-[01] text-3xl md:max-w-max max-w-[300px] p-1 text-center md:text-4xl">
            Seattle's Top Vinyl Record E-Shop
        </h2>     
      <div className="fixed w-full h-full flex flex-col items-center bg-gray-500 bg-opacity-80" />
      </div>
    </>
  );
}
