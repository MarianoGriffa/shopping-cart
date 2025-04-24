import { ShoppingCartState, CartAction, CartItem } from '../types';
//funcion reductora 
//action -> para retornar un nuevo state 

// Función para calcular los totales del carrito 
export const calculateTotals = (items: CartItem[]) => {
  const IVA = 0.21; // IVA del 21%

  const subtotal = items.reduce((total, item) => {
    return total + (item.price * (item.quantity || 1));
  }, 0);
  
  const totalItems = items.reduce((total, item) => {
    return total + (item.quantity || 1); 
  }, 0);
   
  const tax = subtotal * IVA;
  const total = subtotal + tax;  
    
  return { subtotal, tax, total, totalItems };
};

// para encontrar el índice de productos en el catalogo
const findProductIndex = (products: CartItem[], productId: number | string ): number => { 
  return products.findIndex((product) => product.id === productId )
}   

//para encontrar el índice del artículo en el carrito
const findItemIndex = (items: CartItem[], itemId: number | string): number => {
  return items.findIndex(item => item.id === itemId )
} 

// comprobar si hay suficiente stock
const hasEnoughStock = (products: CartItem[], productId: string | number, quantity = 1): boolean => {
  const index = findProductIndex(products, productId);
  return (index !== -1) && products[index].stock >= quantity;
};   

// actualizar las stock de productos
const updateProductStock = (products: CartItem[], productId: string | number, stockChange: number): CartItem[] => { 
  return products.map(product =>  
    product.id === productId
      ? { ...product, stock: product.stock + stockChange }
      : product
  ); 
}; 

export const cartReducer = (state: ShoppingCartState, action: CartAction): ShoppingCartState => {

  switch(action.type) {      
    case "ADD_ITEM": {
       const { id } = action.payload 
      
      // Verifica si rel producto existe y si hay stock
      if (!hasEnoughStock(state.products, id)) {
        return state;
      }
      // Actualizar el stock de poductos (-1)
      const updatedProducts = updateProductStock(state.products, id, -1);
      
      // Averiguar si el artículo existe en el carrito
      const itemIndex = findItemIndex(state.items, id);
      
      //Actualizar o añadir un artículo al carrito
      let updatedItems: CartItem[];
      
      if (itemIndex !== -1) { 
      //Código para actualizar un producto existente,YA EXISTE en el carrito
        updatedItems = state.items.map((item, index) => 
          index === itemIndex
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item  
        ); 
      } else { 
       //Si el producto NO está en el carrito
        updatedItems = [...state.items, { ...action.payload, quantity: 1 }];
      }
      
      const totals = calculateTotals(updatedItems);
      
      return { 
        ...state,
        items: updatedItems,
        products: updatedProducts,
        ...totals
      };
   }
 

  case 'REMOVE_ITEM': { 
   const { id } = action.payload;
   const itemToRemove = state.items.find(item => item.id === id);
  
   //Si no lo encuentra retorna el state
   if(!itemToRemove) return state;

    // Restaurar el stock del producto
    const updatedProducts = updateProductStock(
       state.products,
       id,
       itemToRemove.quantity || 1
    )
    
    //Borrar item del carrito
    const updatedItems = state.items.filter(item => item.id !== id)
    
    const totals = calculateTotals(updatedItems)
    
    return {
      ...state,
       items: updatedItems,
       products: updatedProducts,
      ...totals
    }
          
    };
   
    case 'UPDATE_QUANTITY': {
      const{ id, quantity } = action.payload;

      if (quantity < 1) {
        // Si la cantidad es inferior a 1, se trata como una operación de eliminación
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: { id } });
      }
  
        // Buscar el item actual
      const currentItem = state.items.find(item => item.id === id);
      //Si no lo encuentra retorna el estado inicial
      if (!currentItem) return state;
      
      //Calcula la diferencia entre la nueva cantidad y la cantidad actual (asumiendo 1 como valor predeterminado si no existe). 
      const currentQuantity = currentItem.quantity || 1;
      const quantityDiff = quantity - currentQuantity;
      
      if (quantityDiff === 0) return state;
      

      // Verificar si hay suficiente stock para aumentar
      if (quantityDiff > 0 && !hasEnoughStock(state.products, id, quantityDiff)) {
        return state; 
      } 
       
      // Actualizar el stock del producto -> products
      const updatedProducts = updateProductStock(state.products, id, -quantityDiff);
       
     // Actualizar la cantidad del item en el carrito -> items
      const updatedItems = state.items.map(item =>  
        item.id === id ? { ...item, quantity } : item
      );
  
        const totals = calculateTotals(updatedItems);
 
        return { 
          ...state,
        items: updatedItems,
        products: updatedProducts,
        ...totals
        } 
    }

    case 'CLEAR_CART': {
        // Restaurar todo el stock a los productos
      const restoredProducts = state.products.map(product => {
        const cartItem = state.items.find(item => item.id === product.id);
        return cartItem 
        ? {...product, stock: product.stock + (cartItem.quantity || 1)}
        : product 

         });
        
        return {
          ...state,
          items: [],
          products: restoredProducts,
          totalItems: 0,
          total: 0,
          tax: 0,
          subtotal: 0
        }; 

      }

      case "INITIALIZE_PRODUCTS": {
        return {
          ...state,
          products: action.payload
        };
      }

    default:
        return state; 
    }  
 
 }   
