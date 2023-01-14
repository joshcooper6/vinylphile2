import { useQuery } from "react-query";
import AlbumCard from "./AlbumCard";

export default function Inventory({ vinyls, setVinyls, cart, setCart }) {
    const { data, status } = useQuery('vinyls', async () => {
        const response = await fetch('http://localhost:2222/vinylsDB');
        return response.json();
      });

    if (status === 'loading') { return <div>Loading....</div> }
    if (status === 'error') { return <div>Error: {status.error}</div> }

    return <>
        <div className='flex w-full mb-6 max-w-[1200px] gap-6 self-center justify-center items-center flex-wrap'>
            { data.map((vinyl, indx) => {
              return <AlbumCard 
                key={indx}
                vinyl={vinyl} 
                // setVinyls={setVinyls}
                cart={cart}
                setCart={setCart}
              />
            }) }
        </div>
    </>
}