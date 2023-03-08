import { useEffect, useRef, useState } from "react";
import renderArray from "../funcs/renderArray";
import calculateTotalCost from "../funcs/calcCost";
import getSalesTaxRates from "../funcs/getSalesTaxRates";
import calcItemQuantity from "../funcs/calcQuantity";
import SVG from "./SVG";
import axios from "axios";

export default function SideCart({
  formatPrice,
  cart,
  setShowCart,
  setCart,
  showCart,
}) {
  const totalCartCost = calculateTotalCost(cart);
  const [state, setState] = useState("");

  async function postCart() {
    await axios
      .post("http://localhost:2222/checkout", {
        cart,
      })
      .then((response) => {
        window.location.href = response.data;
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleSelectChange(e, item) {
    if (e.target.value > item.metadata.currentInventory) {
      alert(`Only ${item.metadata.currentInventory} of ${item.name} in stock.`);
    }

    setCart((prev) => {
      return prev.map((vinyl) => {
        if (
          vinyl.id === item.id &&
          e.target.value <= vinyl.metadata.currentInventory
        ) {
          return { ...vinyl, quantity: Number(e.target.value) };
        }

        if (item.quantity > item.metadata.currentInventory) {
          return { ...vinyl, quantity: Number(item.metadata.currentInventory) };
        }

        return { ...vinyl };
      });
    });
  }

  function renderSelectOptions() {
    return renderArray().map((num, indx) => (
      <option value={num} children={num} key={indx} />
    ));
  }

  function deleteFromCart(album) {
    const target = cart.filter((x) => x.name != album.name);

    if (
      confirm(`Are you sure you want to remove ${album.name} from your cart?`)
    ) {
      return setCart(target);
    }

    return console.log(target);
  }

  return (
    <>
      <div
        className={`md:w-6/12 p-4 max-w-[400px] w-full shadow-md fixed ${
          showCart ? "translate-x-[0]" : "translate-x-[-1000px]"
        } transease left-[0] top-0 shadow-r-xl h-screen bg-white z-50`}
      >
        <div className="flex p-4 flex-col w-full h-full gap-3">
          <div className="flex justify-between">
            <h1
              className={`text-3xl font-bold mb-1`}
              children={`Cart (${calcItemQuantity(cart)})`}
            />
            <div
              onClick={() => setShowCart((prev) => !prev)}
              className={`flex justify-end z-[200] text-black p-2 transease`}
            >
              <span className="uppercase font-light tracking-widest cursor-pointer hover:font-bold opacity-50">
                Close
              </span>
            </div>
          </div>

          <div className="flex flex-row-reverse w-full gap-2 self-center">
            <button
              onClick={() => {
                if (confirm('This is only a CONCEPT platform. Do NOT use your actual information as these are not actual products. Refer to Stripe API documentation to make a test payment.')) {
                  postCart()
                };
              }}
              className={`w-3/4 border flex items-center font-light uppercase text-sm justify-center gap-1 border-blue-700 rounded-lg`}
              children={<>Checkout <SVG svgShape={'stripe'} color={'blue'} styles={`scale-[1] translate-y-[-1px]`} /></>}
            />
            <button
              className={`w-1/4 flex items-center justify-center border-gray-300 p-2 border rounded-lg`}
              onClick={() => {
                if (confirm("Are you sure you want to clear your cart?")) {
                  setCart([]);
                  setShowCart(false);
                  setState("");
                }
              }}
            >
              <SVG svgShape={'clearCart'} color={'blue'} />
            </button>
          </div>

          <div className="overflow-y-scroll">
            {cart.map((item, indx) => (
              <div
                key={indx}
                className="flex gap-4 mb-4 border-t-[1px] pt-4 items-center w-full justify-between"
              >
                <select
                  children={renderSelectOptions()}
                  className={`border p-1 rounded-xl border-blue-300`}
                  value={item.quantity}
                  onChange={(e) => handleSelectChange(e, item)}
                />

                <div
                  className={`flex min-h-[50px] items-center justify-center w-2/4 flex-col`}
                >
                  <h2
                    className={`font-bold min-w-[50px] mb-1 text-center uppercase text-xs tracking-widest`}
                    children={item.name}
                  />
                  <h2
                    className={`font-light self-center uppercase text-md tracking-widest`}
                    children={formatPrice(item.convertedPrice, item.currency)}
                  />
                </div>

                <button
                  className={``}
                  children={
                    <SVG
                      setState={null}
                      styles={"fill-gray-400 transease hover:fill-gray-900"}
                      svgShape={"cancel"}
                    />
                  }
                  onClick={() => deleteFromCart(item)}
                />

                <img src={item.image} className={`w-1/4 border rounded-lg`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
