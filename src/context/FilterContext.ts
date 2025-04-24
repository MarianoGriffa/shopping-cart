import { createContext, useContext } from 'react';
import { CartItem, Category } from '../types'; 

interface FilterContextProps {
  products: CartItem[];
  categories: Category[]; 
  filteredProducts: CartItem[];
  nameFilter: string;
  categoryFilter: string;
  setNameFilter: (filter: string) => void;
  setCategoryFilter: (filter: string) => void;
  formatCategoryName: (category: string) => string;
}   
  
//Crear  
export const FilterContext = createContext<FilterContextProps | undefined>({
  products: [],
  categories: [],
  filteredProducts: [],
  nameFilter: '',
  categoryFilter: '',
  setNameFilter: () => {},
  setCategoryFilter: () => {},
  formatCategoryName: (category: string) => category,
}) 
  
//Hook para asegurar que el cotexto funcione donde se espera
export const useFilter = () => {
  const context = useContext(FilterContext);  
   
  if (!context) {     
    throw new Error('useFilter debe ser usado dentro de un FilterProvider');
  } 
  return context;  
};




