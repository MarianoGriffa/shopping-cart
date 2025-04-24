import { useShoppingCart } from '../../context';
import { useNavigate } from 'react-router-dom';

export const CartWidget = () => {
  const { state } = useShoppingCart();  
 
  const navigate = useNavigate();  
  const handleViewCart = () => navigate("/ShoppingCart");  
  
  return (    
   <button
    className="flex items-center gap-2 bg-transparent border-none cursor-pointer relative py-1.5 px-3"
    onClick={handleViewCart}
    aria-label="View shopping cart"
    >
      <img 
        src="/src/assets/bolsoshopping.webp" 
        alt="Cart icon"
        className="w-6 h-6 transition-transform duration-300 ease-in-out hover:scale-110" 
      /> 
      <span 
      className={ 
        state.items.length > 0 
          ? 'absolute -top-1.5 right-9 bg-red-500 text-white text-xs font-bold h-5 w-5 rounded-full flex items-center justify-center' 
          : 'hidden'  
      }
    >
      {state.items.length}
      </span>
      <span className="text-sm font-medium hidden sm:block">Cart</span>
    </button>     
  )
} 
