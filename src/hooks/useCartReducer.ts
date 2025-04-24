import { useEffect, useReducer } from 'react';
import { cartReducer } from './cartReducer';
import { CartItem, ShoppingCartState, initialState } from '../types';
import { useLocalStorage } from './useLocalStorage'; 

interface CartReducerProps {
  initialProducts?: CartItem[];  
} 
// Clave para el localStorage  
const CART_STORAGE_KEY = 'shopping-cart-state'; 
 
export const useCartReducer = ({ initialProducts = [] }: CartReducerProps) => {
  //usar hook personalizado para la persistencia
  const [ persistedState, setPersistedState ] = useLocalStorage<ShoppingCartState | null>( CART_STORAGE_KEY, null )

  // Función para obtener el estado inicial desde localStorage o usar el valor por defecto
  const getInitialState = (): ShoppingCartState => {
    try {
      if (persistedState) {
        return {
          ...persistedState, 
          // Aseguramos que los productos iniciales siempre se mantienen actualizados
          products: initialProducts.map(product => {
            // Recuperar la cantidad en el carrito para este producto (si existe)
            const cartItem = persistedState.items.find(item => item.id === product.id); 
            const quantityInCart = cartItem ? (cartItem.quantity || 1) : 0;
            
            // Restaurar el stock correcto basado en lo que hay en el carrito
            return {
              ...product,
              stock: product.originalStock !== undefined 
                ? product.originalStock - quantityInCart 
                : product.stock
            };
          })
        };
      } 
    } catch (error) {
      console.error("Error al cargar el estado desde localStorage:", error);
    }
   
   // Si no hay estado guardado o hay error, usar el estado inicial por defecto
   return {
     ...initialState,
     products: initialProducts.map(product => ({
       ...product, 
       // Guardar el stock original para posibles restauraciones
       originalStock: product.stock
     }))
   }; 
 };
 
 // Inicializar el reducer con el estado preparado
 const [ state, dispatch ] = useReducer(cartReducer, getInitialState());

 // Sincronizar el estado del reducer con localStorage cada vez que cambie
  useEffect(() => {
   setPersistedState(state); 

 }, [state, setPersistedState]);  

 //Para limpiar la persistencia cuando sea necesario
 const clearPersistedCart = () => {
   localStorage.removeItem(CART_STORAGE_KEY);
   };


 const addItem = (item: CartItem)  => { 
   dispatch({ type:'ADD_ITEM', payload: item })    
 } 

 const removeCart = (id: number) => { 
   dispatch({ type:'REMOVE_ITEM', payload: { id }  })  
 }
   
const updateQuantity = (id: number, quantity: number) => {
     dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
   };

 const clearCart = () => {
   dispatch({ type:'CLEAR_CART' }) 
   clearPersistedCart(); 
 }

 const initializeProducts = (products: CartItem[]) => {
   dispatch({ type: 'INITIALIZE_PRODUCTS', 
    payload: products.map(product => ({
     ...product,
     originalStock: product.stock // Preservar stock original
   })) }); 
 
 
 }

 return {
  state,
  addItem,
  removeCart,
  updateQuantity,
  clearCart,
  clearPersistedCart,
  initializeProducts 
 }


}
