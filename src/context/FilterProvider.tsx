import { ReactNode, useState } from 'react';
import { CartItem, Category } from '../types';
import { FilterContext } from './FilterContext';
import { productList } from '../mock/productList'; 

interface FilterProviderProps {
  children: ReactNode; 
} 
 
//proveer
export const FilterProvider = ( { children }: FilterProviderProps) => {
    
  const [products] = useState<CartItem[]>(productList); 
  const [nameFilter, setNameFilter] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<Category>('all');
   
  // Extraer categorías únicas
  const uniqueCategories = Array.from(new Set(products.map(product => product.category)));

  //Asegurarse que 'all' esté al principio
   const categories: Category[] = [
    'all', ...uniqueCategories.filter(cat => cat !== 'all')
  ];     

  //Filtra la categoría  por nombre y lo muestra de forma más elegante
 const formatCategoryName = (category: string): string => {
  if (category === 'all') return 'All';
  return category.charAt(0).toUpperCase() + category.slice(1);
};  

  // Aplicar filtros
  const filteredProducts = products.filter(product => {
    const matchesName = product.name.toLowerCase().includes(nameFilter.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter; 
    return matchesName && matchesCategory;
  });  
 
 
 return(
    <FilterContext.Provider value={ {
        products, 
        categories,  
        filteredProducts, 
        nameFilter,
        categoryFilter,
        setNameFilter, 
        setCategoryFilter, 
        formatCategoryName
    } } > 
      {children}
    </FilterContext.Provider>  
   ) 
};
  