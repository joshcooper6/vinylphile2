import React, { useContext, useEffect, useState } from "react";
import AlbumContext from "../AlbumContext";
import formatPrice from "../funcs/formatPrice";

function ActiveAlbumModal(props) {
  const { activeAlbum, setActiveAlbum, addToCart } = useContext(AlbumContext);
  const [showTracks, setShowTracks] = useState(false);

  useEffect(() => {
    console.log(activeAlbum);
  }, [activeAlbum]);

  return (
    <div
      className={
        activeAlbum
          ? "flex fixed top-0 left-0 z-[100] flex-col items-center justify-center bg-slate-900 bg-opacity-80 h-screen w-screen"
          : "hidden"
      }
    >
      <div className="w-10/12 p-6 gap-4 rounded-xl flex-col items-center justify-center flex max-w-[400px] bg-blue-100 z-[100]">
        <div className="flex flex-col justify-center w-full items-center gap-4">
          {/* <img className="rounded-xl max-w-[300px] reflect w-11/12 object-cover contrast-125" src={activeAlbum?.image} />
          <div className="self-center">
            <h2
              children={activeAlbum?.metadata?.album}
              className={"text-2xl font-bold"}
            />
            <h3 children={activeAlbum?.metadata?.artist} className={"text-md"} />
          </div> */}

          {showTracks ? (
            <>
              <ol className="flex flex-col w-11/12 border-blue-900 border-opacity-20 border-[1px] border-l-0 border-r-0 max-h-[400px] overflow-scroll gap-1 p-2">
                {activeAlbum?.metadata?.tracks.split(",").map((track, index) => {
                  return <li><span className="font-light text-sm">{(index + 1)}</span> {track}</li>;
                })}
              </ol>
            </>
          ) : (
            <>
              <img
                className="rounded-xl max-w-[300px] reflect w-11/12 object-cover contrast-125"
                src={activeAlbum?.image}
              />
              <div className="self-center text-center">
                <h2
                  children={activeAlbum?.metadata?.album}
                  className={"text-2xl font-bold"}
                />
                <h3
                  children={activeAlbum?.metadata?.artist}
                  className={"text-md"}
                />
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col w-full justify-center items-center gap-2">
          <button
            children={showTracks ? "Hide Tracks" : "Show Tracks"}
            className={`w-full bg-blue-900 tracking-tight text-blue-100 max-w-[300px] p-4 rounded-full`}
            onClick={() => setShowTracks((prev) => !prev)}
          />
          <button
            children={`Add To Cart (${formatPrice(
              activeAlbum?.convertedPrice,
              activeAlbum?.currency
            )})`}
            className={`w-full bg-blue-900 tracking-tight text-blue-100 max-w-[300px] p-4 rounded-full`}
            onClick={() => {
              addToCart(activeAlbum);
              setActiveAlbum(null);
            }}
          />
        </div>
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
