import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import SVG from "./SVG";
import allGenres from "../funcs/allGenres";
import formatPrice from "../funcs/formatPrice";
import { AlbumContext } from "../App";

export default function Inventory() {
  const { cart, setCart, addToCart } = useContext(AlbumContext);

  function fetchVinyls() {
    return fetch("http://localhost:2222/vinyls").then((res) => res.json());
  }

  const { data, isLoading, error } = useQuery("vinyls", fetchVinyls);

  const [genres, setGenres] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [filterInput, setFilterInput] = useState([]);

  // function addToCart(vinyl) {
  //   const existingVinyl = cart.find((item) => item.id === vinyl.id);
  //   if (existingVinyl) {
  //     setCart((prev) =>
  //       prev.map((item) => {
  //         if (item.id === vinyl.id) {
  //           return { ...item, quantity: item.quantity + 1 };
  //         }
  //         return item;
  //       })
  //     );
  //   } else {
  //     setCart((prev) => [...prev, { ...vinyl, quantity: 1 }]);
  //   }
  // }

  function onFilterChange(e) {
    if (e.target.checked && !filterInput.includes(e.target.name)) {
      setFilterInput((prev) => [...prev, e.target.name]);
    }

    if (!e.target.checked && filterInput.includes(e.target.name)) {
      const x = filterInput.filter((x) => x != e.target.name);
      setFilterInput(x);
    }
  }

  useEffect(() => {
    if (data) {
      setGenres(allGenres(data));
    }
  }, [data]);

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
          className="border-[1.2px] flex items-center self-end justify-center gap-3 border-gray-400 p-2 rounded-full"
        >
          <SVG svgShape={"filter"} color={"gray"} styles={`scale-[1]`} />
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
                <label htmlFor={genre}>{genre.toLowerCase()}</label>
              </div>
            );
          })}
        </form>

        <button 
          className={showFilter ? 'border w-10/12 border-gray-400 rounded-md p-3' : 'hidden'}
          children={'Clear Filters'}
          onClick={() => {setFilterInput([])}}
        />

        {filterInput?.length > 0 ? (
          <>
            {filterInput.map((genre, index) => {
              return data.map((vinyl, ind) => {
                if (vinyl.metadata.genre == genre) {
                  return (
                      <div
                        onClick={() => addToCart(vinyl)}
                        key={ind}
                        className={`flex p-4 gap-2 hover:scale-105 cursor-pointer transease justify-center rounded-md bg-blue-900 text-blue-200 flex-col min-h-[250px] w-11/12 md:w-[200px]`}
                      >
                        <img className="rounded-md" src={vinyl.image} />
                        <h2 className="text-md truncate font-bold">
                          {vinyl.name}
                        </h2>
                        <span className="text-3xl font-light" title="PRICE">
                          {formatPrice(vinyl.convertedPrice, vinyl.currency)}
                        </span>
                      </div>
                  );
                }
              });
            })}
          </>
        ) : (
          <>
            {data?.map((vinyl) => (
              <div
                onClick={() => addToCart(vinyl)}
                key={vinyl.id}
                className={`flex p-4 gap-2 hover:scale-105 cursor-pointer transease justify-center rounded-md bg-blue-900 text-blue-200 flex-col min-h-[250px] w-11/12 md:w-[200px]`}
              >
                <img className="rounded-md" src={vinyl.image} />
                <h2 className="text-md truncate font-bold">{vinyl.name}</h2>
                <span className="text-3xl font-light" title="PRICE">
                  {formatPrice(vinyl.convertedPrice, vinyl.currency)}
                </span>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}
