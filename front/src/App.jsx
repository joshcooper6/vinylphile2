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
  
  const { data2, status } = useQuery('vinyls', async () => {
    const response = await fetch('http://localhost:2222/vinyls');
    return response.json();
  });
  
  useEffect(() => {
    vinyls.map((vinyl, indx) => {
      return console.log(vinyl)
    });
  }, []);

  useEffect(() => { if (cart.length > 0) { setShowCart(true) } }, [cart]);

  return (
    <div className="bg-white text-blue-800 flex flex-col items-center min-h-screen min-w-screen">
      
      <Header showCart={showCart} setShowCart={setShowCart} />

      <div className='w-11/12 bg-blue-100 drop-shadow-md rounded-lg mt-4 mb-3 h-[200px] flex flex-col justify-center items-center'>
        promotional content will go here
      </div>

      <div className='flex flex-col w-screen'>
        <div className='mb-6'>
          <h2
            className='p-6 text-5xl font-bold lowercase tracking-tight'
            children={'featured albums'}
          />
        </div>

          {/* <div className='flex w-full mb-6 max-w-[1200px] gap-6 self-center justify-center items-center flex-wrap'>
            { vinyls.map((vinyl, indx) => {
              return <AlbumCard 
                vinyl={vinyl} 
                setVinyls={setVinyls}
                cart={cart}
                setCart={setCart}
              />
            }) }
          </div> */}

          <Inventory
            vinyls={vinyls}
            setVinyls={setVinyls}
            cart={cart}
            setCart={setCart}
          />

      </div>

      <div className='w-11/12 bg-blue-100 drop-shadow-md rounded-lg mt-4 mb-3 h-[200px] flex flex-col justify-center items-center'>
        <h2 className='font-black text-4xl md:text-5xl logo transease'>Sign Up</h2>
      </div>

      <SideCart cart={cart} setCart={setCart} setShowCart={setShowCart} showCart={showCart} />
      
      <Footer />
      {/* <button 
        onClick={() => setShowCart(prev => !prev)} 
        className={`fixed right-0 z-[200] text-black top-0 p-4 transease`}
        children={showCart ? 'X' : <img src={tryThisCart} />}
      /> */}
    </div>
  )
}

export default App
