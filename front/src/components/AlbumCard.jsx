import { useContext, useEffect, useState } from "react";
import { AlbumContext } from "../App";

export default function AlbumCard(props) {
    const { vinyl } = props;
    const { addToCart } = useContext(AlbumContext);

    return (<div
        onClick={() => addToCart(vinyl)}
        className={`flex p-4 gap-2 hover:scale-105 cursor-pointer transease justify-center rounded-md bg-blue-900 text-blue-200 flex-col min-h-[250px] w-11/12 md:w-[200px]`}
      >
        <img className="rounded-md" src={vinyl.image} />
        <h2 className="text-md truncate font-bold">
          {vinyl.name}
        </h2>
        <span className="text-3xl font-light" title="PRICE">
          {formatPrice(vinyl.convertedPrice, vinyl.currency)}
        </span>
      </div>)
}