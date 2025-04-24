import { useEffect, useState } from 'react';


export const ScrollToTopButton  = () => {
  const [isVisible, setIsVisible] = useState(false);  
 
  // Mostrar botón cuando haces scroll hacia abajo
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true); 
      } else { 
        setIsVisible(false);    
      }  
    }; 
 
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
   
  return (   
    <>
      {isVisible && (
        <button
        className="fixed bottom-36 right-10 p-3 text-2xl bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 cursor-pointer"   
          onClick={scrollToTop}   
        >  
          ↑
        </button>
      )} 
    </>
  );
};



