import { useContext, useEffect, useState } from "react";
import AlbumContext from "../AlbumContext";
import formatPrice from "../funcs/formatPrice";

export default function AlbumCard(props) {
  const { vinyl } = props;
  const { addToCart, setActiveAlbum } = useContext(AlbumContext);

  return (
    <div
      onClick={() => setActiveAlbum(vinyl)}
      className={`flex p-4 gap-4 hover:scale-105 cursor-pointer transease justify-start rounded-md bg-blue-900 text-blue-200 md:flex-col w-full max-w-[400px] md:w-[200px]`}
    >
      <img className="rounded-md w-[100px] md:w-full" src={vinyl?.image} />
      <div className="flex flex-col self-center md:self-start w-full max-w-[120px] ">
        <h2 className="text-md truncate font-bold">{vinyl?.metadata.album}</h2>
        <h2 className="text-md truncate">{vinyl?.metadata.artist}</h2>

        <span className="text-3xl font-light" title="PRICE">
          {formatPrice(vinyl?.convertedPrice, vinyl?.currency)}
        </span>
      </div>
    </div>
  );
}
