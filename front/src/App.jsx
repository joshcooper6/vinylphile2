import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import data from "./data";
import "./App.css";
import AlbumCard from "./components/AlbumCard";
import SideCart from "./components/SideCart";
import tryThisCart from "./assets/cart.svg";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Inventory from "./components/Inventory";

function formatPrice(price, currency) {
  // Convert the price to a string and add a decimal point two places from the end
  const formattedPrice = (price / 100).toFixed(2);

  // Create an object to map currency codes to symbols
  const currencySymbols = {
    usd: "$",
    eur: "€",
    gbp: "£",
    jpy: "¥",
    aud: "A$",
    cad: "C$",
    // add more currencies as needed
  };

  // Look up the currency symbol based on the provided currency code
  const symbol = currencySymbols[currency] || currency;

  // Return the formatted price string with the currency symbol
  return `${symbol}${formattedPrice}`;
}

function VinylInventory({ cart, setCart }) {
  function fetchVinyls() {
    return fetch("http://localhost:2222/vinyls").then((res) => res.json());
  }

  const { data, isLoading, error } = useQuery("vinyls", fetchVinyls);

  function allGenres() {
    let genres = [];
    data?.map((album, indx) => {
      const filter = genres.filter(x => x == album.metadata.genre);
      if ((album.metadata.genre != undefined) && (filter.length <= 0)) {
        genres.push(album.metadata.genre);
      }
    });
    return genres;
  }

  useEffect(() => {
    if (data) {
      console.log('genres rendered', allGenres())
    }
   }, [data]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  function addToCart(vinyl) {
    const existingVinyl = cart.find((item) => item.id === vinyl.id);
    if (existingVinyl) {
      setCart((prev) =>
        prev.map((item) => {
          if (item.id === vinyl.id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        })
      );
    } else {
      setCart((prev) => [...prev, { ...vinyl, quantity: 1 }]);
    }
  }

  return (
    <div className="flex w-11/12 max-w-[1000px] gap-4 self-center rounded-xl bg-gray-200 border p-10 items-center justify-center flex-wrap">
      {data.map((vinyl) => (
        <div
          onClick={() => addToCart(vinyl)}
          key={vinyl.id}
          className={`flex p-4 gap-2 hover:scale-105 cursor-pointer transease justify-center rounded-md bg-blue-900 text-blue-200 flex-col min-h-[250px] w-full md:w-[200px]`}
        >
          <img className="rounded-md" src={vinyl.image} />
          <h2 className="text-md truncate font-bold">{vinyl.name}</h2>
          <span className="text-3xl font-light" title="PRICE">
            {formatPrice(vinyl.convertedPrice, vinyl.currency)}
          </span>
        </div>
      ))}
    </div>
  );
}

function App() {
  const [showCart, setShowCart] = useState(false);
  const [vinyls, setVinyls] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (cart.length > 0) {
      setShowCart(true);
    }

    console.log(cart);
  }, [cart]);

  return (
    <div className="bg-white text-blue-800 flex flex-col items-center min-h-screen min-w-screen">
      <Header showCart={showCart} setShowCart={setShowCart} />

      <div className="flex flex-col w-screen">
        <VinylInventory cart={cart} setCart={setCart} />
      </div>

      {/* <div className="w-11/12 max-w-[1000px] bg-blue-100 drop-shadow-md rounded-lg mt-4 mb-3 h-[200px] flex flex-col justify-center items-center">
        <h2 className="font-black text-4xl md:text-5xl logo transease">
          Sign Up
        </h2>
      </div> */}

      <SideCart
        formatPrice={formatPrice}
        cart={cart}
        setCart={setCart}
        setShowCart={setShowCart}
        showCart={showCart}
      />

      {/* <Footer /> */}
    </div>
  );
}

export default App;
