import React, { useContext } from "react";
import AlbumContext from "../AlbumContext";

function ActiveAlbumModal(props) {
  const { activeAlbum, setActiveAlbum, addToCart } = useContext(AlbumContext);

  return (
    <div
      className={
        activeAlbum
          ? "flex fixed top-0 left-0 z-[100] flex-col items-center justify-center bg-slate-900 bg-opacity-80 h-screen w-screen"
          : "hidden"
      }
    >
      <div className="w-10/12 p-4 rounded-xl flex-col items-center justify-center flex max-w-[400px] bg-blue-100 z-[100]">
        <button
          children={`Add To Cart`}
          className={`w-full bg-blue-900 tracking-tight text-blue-100 max-w-[300px] p-4 rounded-full`}
          onClick={() => addToCart(activeAlbum)}
        />
      </div>
      <button
        children={"Dismiss"}
        className={" p-2 text-blue-100 uppercase tracking-widest font-light"}
        onClick={() => setActiveAlbum(null)}
      />
    </div>
  );
}

export default ActiveAlbumModal;
