import { FilterCategory } from '../../components';
import { ScrollToTopButton } from '../../components';
import { useProducts } from '../../hooks/useProducts';
import { useFilter } from '../../context';
    
import './ShoppingCartList.css'; 
 
export const ShoppingCartList = ()  => {   
  
  const { categoryFilter, formatCategoryName } = useFilter();  
  
  const {  
    products, 
    handleAddToCart,  
    checkIfProductAvailable, 
    getButtonText,
    hasProducts 
  } = useProducts();     
    
  
  return (
    <>
     <FilterCategory />   
 
     <div className="products-section">  
     
      <h2 className="products-title">{formatCategoryName(categoryFilter)}</h2>     

      <ul className="product-list">    
      {       
        hasProducts ? ( 
          products.map( product => (   
          <div key={product.id} className="product-card">
           <div className="product-image-container">
          <img 
            src={product.image} 
            className="product-image"
            alt={product.name}  
          /> 
        </div>
        <div className="product-details">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-price">${product.price.toFixed(2)}</p>
          <p className="product-stock">Stock: {product.stock}</p>
        <button 
          className={`add-to-cart-button ${!checkIfProductAvailable(product) ? 'disabled' : ''}`}
          onClick={() => handleAddToCart(product)} 
          disabled={!checkIfProductAvailable(product)} 
            >  
              {getButtonText(product)} 
            </button>  
        </div>  
        </div>            
          ))     
        ) : (
        <div>
          <p className="text-gray-500">No se encontraron productos</p>
        </div>      
        )    
      } 
      </ul>  
      <ScrollToTopButton />
     </div> 
     </>
  )
}

