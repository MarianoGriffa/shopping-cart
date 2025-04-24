import { createContext, useContext } from 'react';
import { ShoppingCartContextType } from '../types';

//Creamos el contexto
export const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>({
  state: {
    items: [], 
    products: [],
    totalItems: 0,
    subtotal: 0,
    tax: 0,
    total: 0 
  },  
    addItem: () => {},
    removeCart: () => {},
    updateQuantity: () => {},
    clearCart: () => {},
    clearPersistedCart: () => {}, 
    initializeProducts: () => {}, 
    products: []
});
  
// Hook personalizado para usar el contexto correctamemte
export const useShoppingCart = (): ShoppingCartContextType => {
  
  const context = useContext(ShoppingCartContext);   
     
  if(!context) { 
    throw new Error("useShoppingCart debe ser usado dentro de un ShoppingCartProvider")
  }   
   
  return  {
    ...context,
    products: context.state.products // Facilita el acceso directo a products
  };  
}


