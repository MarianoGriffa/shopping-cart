import { ReactNode} from 'react';
import { ShoppingCartContext } from "./ShoppingCartContext";

import { useCartReducer } from '../hooks/useCartReducer';
import { CartItem } from '../types';
  
interface ShoppingCartProviderProps {
  children: ReactNode;
  initialProducts?: CartItem[]; 
}
 //proveer
export const ShoppingCartProvider = ( { children, initialProducts = [] }: ShoppingCartProviderProps ) => {  
   
  const {
  state,  
  addItem,
  removeCart,
  updateQuantity,
  clearCart,
  initializeProducts,
  clearPersistedCart
  } = useCartReducer({ initialProducts });
   
  return ( 
    <ShoppingCartContext.Provider value={{
      state,
      addItem,     
      removeCart,
      updateQuantity,
      clearCart, 
      clearPersistedCart, // Exponer la función para limpiar datos persistidos
      initializeProducts, //inicializacion productos
      products: state.products //actulizacion productos
    }}>  
      {children}   
    </ShoppingCartContext.Provider>  
  ); 
}

