import { useFilter, useShoppingCart } from '../context';
import { CartItem } from '../types';

 
export const useProducts = () => {
   
  const { filteredProducts } = useFilter();  
  const { addItem, products } = useShoppingCart();  

  // Combinar productos filtrados con información de stock actualizada
  const updatedFilteredProducts = filteredProducts.map(filteredProduct => {
    // Buscar el producto correspondiente en el estado actualizado del carrito
    const updatedProduct = products.find(p => p.id === filteredProduct.id);
    
    // Si encontramos el producto actualizado, usamos su stock, de lo contrario usamos el original
    return updatedProduct 
    ? { ...filteredProduct, stock: updatedProduct.stock } 
    : filteredProduct; 
  });
 
   const handleAddToCart = (product: CartItem) => {
    if (product.stock <= 0) return;
     addItem(product);    
  };   

  const checkIfProductAvailable = (product: CartItem) => {
   // Buscar el producto actualizado para verificar su stock real 
    const updatedProduct = products.find(p => p.id === product.id)
    return updatedProduct ? updatedProduct.stock > 0 : product.stock > 0;      
  };   
  
  const getButtonText = (product: CartItem) => {
    // Buscar el producto actualizado para mostrar el texto correcto
    const updatedProduct = products.find(p => p.id === product.id);
    return (updatedProduct ? updatedProduct.stock > 0 : product.stock > 0) ?
     'Add to cart' : 'Out of stock';  
   
  };  

  return{
    products: updatedFilteredProducts,
    handleAddToCart, 
    checkIfProductAvailable,
    getButtonText,
    hasProducts: updatedFilteredProducts.length > 0 
  }  

}
