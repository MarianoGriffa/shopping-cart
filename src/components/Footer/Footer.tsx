
export const Footer = () => { 
  return (
          <footer className="mt-auto p-5 bg-blue-50 h-20 flex items-center justify-center"> 
            <section>   
              <div className="text-center">
                <p>   
                  <strong>Shopping Cart</strong> por {''}  
                  <a 
                  className="text-blue-600 hover:underline" 
                  href="mailto: marianogriffa@hotmail.com">Griffa Mariano</a> 
                   © Todos los derechos reservados - { new Date().getFullYear() }.  
                </p>                 
              </div>       
            </section>     
          </footer>       
  );    

} 