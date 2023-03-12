import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import SVG from "./SVG";
import allGenres from "../funcs/allGenres";
import AlbumContext from "../AlbumContext";
import AlbumCard from "./AlbumCard";
import capitalize from "../funcs/capitalize";

export default function Inventory() {
  const { cart, setCart, showCart, setShowCart, addToCart, setMasterInventory } = useContext(AlbumContext);

  function fetchVinyls() {
    return fetch("http://localhost:2222/vinyls").then((res) => res.json());
  }

  const { data, isLoading, error } = useQuery("vinyls", fetchVinyls);

  const genres = allGenres(data);
  const [showFilter, setShowFilter] = useState(false);
  const [filterInput, setFilterInput] = useState([]);

  useEffect(() => {console.log(genres); setMasterInventory(data)}, [data]);
  useEffect(() => {console.log('input', filterInput)}, [filterInput]);

  function onFilterChange(e) {
    if (e.target.checked && !filterInput.includes(e.target.name)) {
      setFilterInput((prev) => [...prev, e.target.name]);
    }

    if (!e.target.checked && filterInput.includes(e.target.name)) {
      const x = filterInput.filter((x) => x != e.target.name);
      setFilterInput(x);
    }
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <div className="w-11/12 max-w-[1000px] flex self-center p-4 justify-between items-center">
        <h2 className="text-3xl font-bold">Featured Vinyls</h2>
        <button
          onClick={() => setShowFilter((prev) => !prev)}
          className="bg-blue-900 flex items-center self-end justify-center gap-3 border-gray-400 p-2 rounded-full"
        >
          <SVG svgShape={"filter"} color={"white"} styles={`scale-[1]`} />
        </button>
      </div>

      <div className="flex w-11/12 max-w-[1000px] gap-4 self-center rounded-2xl bg-gray-200 border p-10 items-center justify-center flex-wrap">        
        <form
          className={`flex ${
            showFilter ? "max-h-[300px]" : "max-h-[0] hidden opacity-0 z-[-100]"
          } transease w-full flex-wrap justify-center gap-3`}
        >
          {genres?.map((genre, index) => {
            return (
              <div key={index} className="flex items-center gap-2">
                <input onChange={onFilterChange} type="checkbox" name={genre} checked={filterInput.includes(genre)} />
                <label htmlFor={genre}>{capitalize(genre)}</label>
              </div>
            );
          })}
        </form>

        <button 
          className={showFilter ? 'border w-10/12 bg-blue-900 text-blue-100 rounded-md p-3' : 'hidden'}
          children={'Clear Filters'}
          onClick={() => {setFilterInput([]); setShowFilter(false);}}
        />

        {filterInput?.length > 0 ? (
          <>
            {filterInput.map((genre, index) => {
              return data.map((vinyl, ind) => {
                if (vinyl.metadata.genre.toLowerCase() == genre.toLowerCase()) {
                  return (
                    <AlbumCard vinyl={vinyl} key={`${genre}_${vinyl?.metadata.album}_${index}_${ind}`} />
                  );
                }
              });
            })}
          </>
        ) : (
          <>
            {data?.map((vinyl, index) => (
              <AlbumCard vinyl={vinyl} key={`${vinyl}_${index}`} />
            ))}
          </>
        )}
      </div>
    </>
  );
}
