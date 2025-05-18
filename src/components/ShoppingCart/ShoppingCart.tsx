import { useNavigate } from 'react-router-dom'; 
import { useShoppingCart } from '../../context/ShoppingCartContext';
import { ScrollToTopButton } from '../../components';
  
import '../ShoppingCart/ShoppingCart.css';  

 export const ShoppingCart = ( ) => {
  const { state, removeCart, clearCart, updateQuantity } = useShoppingCart();

  const navigate = useNavigate();   
  const backToHome = useNavigate(); 

  const handleCheckout = () => navigate("/checkout"); 
  const handleBackToHome = () => backToHome("/");    

    return (    
    <> 
    <h3 className="cart-title"> Your Cart </h3>

  <div className="cart"> 
    {state.items.length === 0 ? (
      <div className="cart-void cart-total"> 
        <p>Tu carrito esta vacio :( </p>
        <figure>
          <img className='box-void' src='/src/assets/caja.png' alt="box void" />
        </figure>
        <button className='backtohome' onClick={handleBackToHome}>
          🛒 Seguir comprando
        </button> 
      </div> 
    ) : ( 
      <>
        <div className='button-to-home'>
         <button className='backtohome-cart' onClick={handleBackToHome}>
          🛒 volver 
          </button> 
          </div>
        <ul className='cart-list'> 
          { state.items.map((item) => (
            <li key={item.id} className='cart-item'>
              <img src={item.image} alt={item.name} className="cart-item-image" />

              <div className="cart-item-details">
                <h4> {item.name} </h4> 
                <p> ${item.price.toFixed(2)} x {item.quantity} </p>
              </div> 

              <div className="quantity-controls">
                <button
                  onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                  disabled={(item.quantity || 1) >= item.stock}
                >
                  +
                </button>
                <span>{item.quantity || 1}</span>
                <button
                  onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                  disabled={(item.quantity || 1) <= 1}
                >
                  -
                </button>
                <button
                  onClick={() => removeCart(item.id)}
                  className="cart-item-remove"
                >
                  🗑️
                </button>
              </div> 
            </li> 
          ))}
         <ScrollToTopButton /> 
        </ul> 
            <div className="cart-summary">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>${state.subtotal.toFixed(2)}</span>
              </div> 
              <div className="summary-row">
                <span>IVA (21%):</span>
                <span>${state.tax.toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>${state.total.toFixed(2)}</span>
              </div>
              <button
                className="clear-cart-button"
                onClick={clearCart}
              >
                Vaciar carrito  
              </button>
              <button
                onClick={handleCheckout}
                className="checkout"
              >
                Proceed to Checkout
              </button>
            </div> 
          </>
          )}
        </div> 
      </>   
    )
  }
