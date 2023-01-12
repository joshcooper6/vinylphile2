import { useEffect, useRef, useState } from "react";
import renderArray from "../funcs/renderArray";
import calculateTotalCost from "../funcs/calcCost";
import getSalesTaxRates from '../funcs/getSalesTaxRates'
import calcItemQuantity from "../funcs/calcQuantity";
import SVG from "./SVG";

export default function SideCart({cart, setShowCart, setCart, showCart}){

    const totalCartCost = calculateTotalCost(cart);
    const [state, setState] = useState('');

    function handleSelectChange(e, item) {
        setCart(prev => {
            return prev.map(vinyl => {
                if ((vinyl.id === item.id) && (e.target.value <= vinyl.inventory)) {
                    return {...vinyl, quantity: Number(e.target.value)}
                };

                if (item.quantity > item.inventory) {
                    return {...vinyl, quantity: Number(item.inventory)}
                };

                return {...vinyl};
            })
        });
    };

    function renderSelectOptions() {
        return renderArray().map((num, indx) => <option value={num} children={num} key={indx} />);
    };

    function deleteFromCart(album) {
        const target = cart.filter(x => x.album != album.album);
        
        if(confirm(`Are you sure you want to remove ${album.album} from your cart?`)) {
            return setCart(target)
        };

        return console.log(target);
    };

    return <>
        <div className={`md:w-6/12 max-w-[400px] w-8/12 shadow-md fixed ${showCart ? 'translate-x-[0]' : 'translate-x-[-1000px]'} transease left-[0] top-0 shadow-r-xl h-screen bg-white z-50`} >
            <div className="flex p-4 flex-col w-full h-full gap-3">

                <div className="flex justify-between">
                    <h1 className={`text-3xl font-bold mb-1`} children={`Cart (${calcItemQuantity(cart)})`} />
                    <div onClick={() => setShowCart(prev => !prev)} className={`flex justify-end z-[200] text-black p-2 transease`}>
                        <span className="uppercase font-light tracking-widest cursor-pointer hover:font-bold opacity-50">Close</span>
                    </div>
                </div>
                
                
                {cart.map(item => <>
                    <div className="flex gap-4 border-t-[1px] pt-4 items-center w-full justify-between">
                        <select
                            children={renderSelectOptions()}
                            className={`border p-1 rounded-xl border-blue-300`}
                            value={item.quantity}
                            onChange={(e) => handleSelectChange(e, item)}
                        />

                        <div className={`flex bg-[url(${item.albumCover})] min-h-[50px] items-center justify-center w-2/4 flex-col`}>
                            <h2
                                className={`font-bold min-w-[50px] mb-1 text-center uppercase text-xs tracking-widest`}
                                children={item.album}
                            />
                             <h2
                                className={`font-thin hidden uppercase text-xs tracking-widest`}
                                children={item.artist}
                            />
                            <h2
                                className={`font-light self-center uppercase text-md tracking-widest`}
                                children={`$${item.price}`}
                            />
                        </div>

                        <button
                            className={``}
                            children={<SVG setState={null} styles={'fill-gray-400 transease hover:fill-gray-900'} svgShape={'cancel'} />}
                            onClick={() => deleteFromCart(item)}
                        />

                        <img 
                            src={item.albumCover} 
                            className={`w-1/4 border rounded-lg`}
                        />
                    </div>
                </>)}

                <div className="flex flex-col border-t-[1px] pt-6 pb-6">
                    <h2 className="text-3xl font-bold text-right">${totalCartCost}</h2>
                    <h2 className="text-xs uppercase tracking-widest opacity-40 text-right">+ Taxes & Fees</h2>
                </div>

                <div className="flex w-1/2 flex-col self-center">
                    <button className={`w-full p-2 border border-green-700 rounded-lg`} children={'Checkout'} />
                    <button className={`w-full border-red-700 mt-4 p-2 border rounded-lg`} onClick={() => {setCart([]); setState('');}}>Clear Cart</button>
                </div>
            </div>
        </div>
    </>
}