import { createContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import "./App.css";
import SideCart from "./components/SideCart";
import Header from "./components/Header";
import PaymentStatus from "./components/PaymentStatus";
import Inventory from "./components/Inventory";
import SVG from "./components/SVG";
import formatPrice from "./funcs/formatPrice";
import ActiveAlbumModal from "./components/ActiveAlbumModal";

const AlbumContext = createContext();

function App() {
  const [showCart, setShowCart] = useState(false);
  const [activeAlbum, setActiveAlbum] = useState([]);
  const [cart, setCart] = useState([]);

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

  const stateVariables = {
    cart,
    setCart,
    showCart,
    setShowCart,
    activeAlbum,
    setActiveAlbum,
    addToCart,
  };

  useEffect(() => {
    if (cart.length > 0) {
      setShowCart(true);
    }

    console.log(cart);
  }, [cart]);

  return (
    <div className="bg-white text-blue-800 flex flex-col items-center min-h-screen min-w-screen">
      <AlbumContext.Provider value={stateVariables}>
        <Header showCart={showCart} setShowCart={setShowCart} />

        <ActiveAlbumModal />

        <div className="flex flex-col w-screen">
          <PaymentStatus />
          <Inventory cart={cart} setCart={setCart} />
        </div>

        <SideCart
          formatPrice={formatPrice}
          cart={cart}
          setCart={setCart}
          setShowCart={setShowCart}
          showCart={showCart}
        />
      </AlbumContext.Provider>
    </div>
  );
}

export default App;
