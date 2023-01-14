import { useEffect, useState } from "react";
import AddToListButton from "./AddToListButton";
import SVG from "./SVG";
import addButton from '../assets/add.svg';

export default function AlbumCard({vinyl, setCart, cart}) {
    const [vinylShow, setVinylShow] = useState(false);
    const [addConfirm, setAddConfirm] = useState(false);
    const [included, setIncluded] = useState(false);

    function findInCart(album) {
        let tgt = cart.filter(x => x.album === album.album);
        return tgt;
    };



    useEffect(() => {
        // if (addConfirm) { 
        //     setTimeout(() => { setAddConfirm(false) }, 1500)
        //  }
    }, [addConfirm]);

    useEffect(() => { if (findInCart(vinyl).length === 0) { setAddConfirm(false) } else { setAddConfirm(true) } }, [cart])

    function addToCart(album) {
        const existingAlbum = cart.find(a => a.album === album.album);
        if ((!existingAlbum) && (album.inStock > 0)) { setCart(prev => [...prev, album])  };

        if (album.inStock <= 0) {
            alert ('Not enough inStock.')
        }

         setCart(prev => {
            return prev.map(vinyl => {
                if ((vinyl.id === album.id) && (vinyl.inStock > vinyl.quantity)) {
                    return {...vinyl, quantity: (vinyl.quantity + 1)}
                };

                return {...vinyl};
            })
        });
      };

    return <div className="flex w-11/12 md:w-8/12 border-[1px] p-6 max-w-[400px] justify-between items-center">
        <div onClick={() => { vinyl.inStock > 0 ? addToCart(vinyl) : null }} className={`relative ${vinyl.inStock <= 0 ? 'disabled' : 'cursor-pointer' } flex`} onMouseLeave={() => setVinylShow(false)} onMouseOver={() => setVinylShow(true)}  >
            <div 
                className={`bg-gray-600 ${vinyl.inStock <= 0 ? 'hidden' : ''} absolute transease ${vinylShow ? 'translate-x-[-50px]' : 'translate-x-0'} z-0 self-center rounded-tl-full rounded-bl-full h-[150px] w-[100px]`}
                children={' '} 
            />
            <img 
                src={vinyl.coverImg} 
                className={'max-w-[150px] bg-blue-800 shadow-lg z-10 rounded-lg object-cover'}
            />
            <div 
                children={<span>Check<br />back<br />soon</span>}
                className={`${vinyl.inStock <= 0 ? '': 'hidden'} w-[150px] p-2 text-center font-black uppercase text-xl h-[150px] flex flex-col items-center justify-center bg-white z-20 rounded-lg opacity-80 absolute`}
            />
        </div>
        <div className="flex min-w-[150px] text-center leading-1 flex-col">
            <h2 className=" font-extrabold text-lg">{vinyl.album}</h2>
            <h2 className="font-light uppercase text-sm">{vinyl.artist}</h2>
            <h2 className="font-thin text-2xl text-black">${vinyl.price}</h2>

            { vinyl.inStock <= 0 ? <>
                <h2 className="uppercase text-md tracking-widest pt-2 opacity-80 font-thin ">Sold Out</h2>
            </> : <>
                {/* <button onClick={() => addToCart(vinyl)} className="self-center pt-2">
                    <img src={addButton} className={`pt-2`} />
                </button> */}
                <div className="flex justify-center mt-4" onClick={() => { addToCart(vinyl); setAddConfirm(true); }}> 
                    <SVG 
                        svgShape={ addConfirm ? 'confirm' : 'add' } 
                        styles={ addConfirm ? 'rotate fill-green-500' : 'fill-blue-900' } 
                    />
                 </div>
            </> }
            <span className="pt-2 text-xs tracking-wider">
                { findInCart(vinyl).length > 0 ? `${findInCart(vinyl)[0].quantity} already in cart!` : null}
            </span>
            {/* <AddToListButton /> */}
            
        </div> 

    </div>
}