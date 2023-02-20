import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import data from './data';
import './App.css';
import AlbumCard from './components/AlbumCard';
import SideCart from './components/SideCart';
import tryThisCart from './assets/cart.svg';
import Header from './components/Header';
import Footer from './components/Footer';
import Inventory from './components/Inventory';

function App() {
  const [showCart, setShowCart] = useState(false);
  const [vinyls, setVinyls] = useState([]);
  const [cart, setCart] = useState([]);
  
  useEffect(() => { if (cart.length > 0) { setShowCart(true) } }, [cart]);

  return (
    <div className="bg-white text-blue-800 flex flex-col items-center min-h-screen min-w-screen">
      
      <Header showCart={showCart} setShowCart={setShowCart} />

      <div className='flex flex-col w-screen'>

      </div>

      <div className='w-11/12 bg-blue-100 drop-shadow-md rounded-lg mt-4 mb-3 h-[200px] flex flex-col justify-center items-center'>
        <h2 className='font-black text-4xl md:text-5xl logo transease'>Sign Up</h2>
      </div>

      <SideCart cart={cart} setCart={setCart} setShowCart={setShowCart} showCart={showCart} />
      
      {/* <Footer /> */}
    </div>
  )
}

export default App
