import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import "./App.css";
import SideCart from "./components/SideCart";
import Header from "./components/Header";
import PaymentStatus from './components/PaymentStatus';
import Inventory from "./components/Inventory";
import SVG from "./components/SVG";
import formatPrice from "./funcs/formatPrice";
import ActiveAlbumModal from "./components/ActiveAlbumModal";

function App() {
  const [showCart, setShowCart] = useState(false);
  const [activeAlbum, setActiveAlbum] = useState(null);
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
    </div>
  );
}

export default App;
