import { SearchInput } from '../../components';
import { CartWidget } from '../../components';
import logoShopping  from '../../assets/tech-shopping-logo.svg';
import { Link } from 'react-router-dom';
    
export const Header = () => {
  
  return (  
  <nav className="flex justify-between items-center px-6 py-3 bg-blue-50 shadow-md sticky top-0 z-100">
    <Link to="/" aria-label="Home">
      <img
        className="w-30 h-auto transition-transform duration-300 ease-in-out hover:scale-110"
        src={logoShopping}
        alt="logo shopping" 
      />
    </Link>     
       
      <SearchInput  />     
       
       <Link to="/ShoppingCart"  
       aria-label="Shopping Cart">
          <CartWidget />    
       </Link>  
     
    </nav>   
   )

} 
