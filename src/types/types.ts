export type MouseEvent =  React.MouseEvent<HTMLButtonElement>
export type SubmitEvent =  React.FormEvent<HTMLFormElement>
export type ChangeEvent =  React.ChangeEvent<HTMLInputElement>  
export type FocusEvent =   React.FocusEvent<HTMLInputElement>  
                          
//tipos de datos iniciales 
//Products iniciales  
export interface CartItem  { 
  id: number; 
  name: string;     
  category: string;
  price: number;
  quantity: number; 
  stock: number;
  originalStock?: number;
  image: string;  
 }           
  
 //Datos de entrada de mi State 
export interface ShoppingCartState {
  items: CartItem[];    
  products: CartItem[]; 
  totalItems: number; 
  subtotal: number;
  tax: number;
  total: number; 
 }    
 
 // Estado inicial
 export const initialState: ShoppingCartState = {
  items: [], // -> carrito
  products: [], // -> stock
  totalItems: 0, 
  subtotal: 0,
  tax: 0,
  total: 0      
 };  
 
// Definir los tipos de acciones  action: CartAction 
export type CartAction =
 | { type: 'ADD_ITEM'; payload: CartItem } 
 | { type: 'REMOVE_ITEM'; payload: { id: number } }
 | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
 | { type: 'CLEAR_CART' }    
 | { type: 'INITIALIZE_PRODUCTS'; payload: CartItem[] }
  

export interface ShoppingCartContextType {
  state: ShoppingCartState;  
  addItem: (item: CartItem) => void;
  removeCart: (id: number) => void; 
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;  
  clearPersistedCart: () => void;   
  initializeProducts: (products: CartItem[]) => void;
  products: CartItem[]; 
  // Agregamos esta propiedad para acceder fácilmente a los productos 
}     
 
//Category
export type Category = 'all' | 'laptop' | 'smartphone' | 'keyboard' | string; 
     
 
// // Define the FormData interface to match what comes from InputForm
// export interface FormData {
//   firstName: string;
//   lastName: string;
//   email: string;
//   address: string;
//   city: string;
//   postalCode: string;
//   cardNumber: string;
//   expiryDate: string;
//   cvv: string; 
// }
  