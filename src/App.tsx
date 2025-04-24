import { productList } from './mock/productList';
import { ShoppingCartProvider } from './context';
import { FilterProvider } from './context/FilterProvider';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header/Header'; 
import { ShoppingCartList } from './components/ShoppingCartList/ShoppingCartList';
import { ShoppingCart } from './components/ShoppingCart/ShoppingCart';
import { Footer } from './components/Footer/Footer'; 
    
import './index.css';     
  
function App() {
  
return (   
<ShoppingCartProvider initialProducts={productList}> 
<FilterProvider>   
 <BrowserRouter>   
    <Header />    
        <Routes>  
          <Route path='/' element={<ShoppingCartList  />} />
          <Route path='/ShoppingCart' element={<ShoppingCart />} />   
          <Route path='*' element={<h1>404 NOT FOUND</h1>} />  
        </Routes>     
      <Footer />        
    </BrowserRouter> 
  </FilterProvider> 
</ShoppingCartProvider> 
  )   
}  
 
export default App;
