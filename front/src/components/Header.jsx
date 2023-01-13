import cartSvg from '../assets/cart.svg';
import { faRecordVinyl } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SVG from './SVG';

export default function Header({showCart, setShowCart}) {
    return <div className="flex w-screen drop-shadow-md mb-6 justify-between bg-blue-900">

        <div className='logo flex p-5 items-center text-blue-200 select-none justify-center'>
            <FontAwesomeIcon icon={faRecordVinyl} className={'text-5xl p-2'} />
            <h1 className='lowercase tracking-tighter text-6xl'>Vinylphile</h1>
        </div>

        {/* <button 
            onClick={() => setShowCart(prev => !prev)} 
            className={`text-black mr-6 scale-125 transease`}
            children={showCart ? 'X' : <svg src={cartSvg} className={'fill-blue-200'} alt="shopping cart" />}
        /> */}

        <SVG 
            setState={setShowCart}
            svgShape={showCart ? 'cancel' : 'shoppingCart'} 
            styles={'fill-blue-200 scale-125 mr-6'} 
        />
      </div>
};