import { useState } from "react";
import { CustomForm } from "./CustomForm"; 
import { useNavigate } from "react-router-dom";
import { FormValues } from "../../models/form.model";
import { useShoppingCart } from "../../context";

// Tipos específicos para mejor tipado
type FormSubmitHandler = (formdata: FormValues) => Promise<void>;
type NavigationHandler = () => void;
type ApiResponse = {
  success: boolean;
  message: string;
  orderId?: string;
};

type CheckoutState = {
  status: "idle" | "loading" | "success" | "error";
  error: string | null; 
  orderDetails: { orderId: string } | null;
};

//Checkout se encarga del flujo de la compra y estados relacionados.
export const Checkout = () => {

  const navigate = useNavigate();
  const handleBackToHome: NavigationHandler = () => navigate("/");

  const { clearCart } = useShoppingCart();

  // Estado consolidado en un solo objeto
  const [state, setState] = useState<CheckoutState>({
    status: 'idle',
    error: null,
    orderDetails: null
  });

  const onFormSubmit: FormSubmitHandler = async (formdata) => {
    
    setState(prev => ({ ...prev, status: 'loading', error: null }));

    try {
      // Simulación de una respuesta de API tipada
      const response: ApiResponse = await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulamos un 10% de probabilidad de error para testing
          if (Math.random() < 0.1) {
            reject(new Error("Error al procesar el pago. Intente nuevamente."));
          }
          resolve({
            success: true,
            message: "Pago procesado correctamente",
            orderId: `ORD-#${Math.floor(Math.random() * 10000)}`,
          });
        }, 1500);
      });

      clearCart();
      setState(prev => ({
        ...prev,
        status: 'success',
        orderDetails: { orderId: response.orderId || "unknown" }
      }));

      console.log("Datos del formulario enviados:", formdata);

      setTimeout(() => {
        handleBackToHome();
      }, 4000);
       
    } catch (error) {
      console.error("Error al procesar el pago:", error);
      setState(prev => ({
        ...prev,
        status: 'error',
        error: error instanceof Error ? error.message : "Error desconocido al procesar el pago"
      }));
    }
  };

  const handleRetry = () => {
    setState(prev => ({ ...prev, status: 'idle', error: null }))
  };


  if (state.status === "error") {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-red-800 mb-2">Error</h2>
          <p className="text-red-700 mb-6">{state.error}</p>
          <button
            onClick={handleRetry}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors mr-4"
          >
            Intentar nuevamente
          </button>
          <button
            onClick={ handleBackToHome }
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Volver a la tienda
          </button>
        </div>
      </div>
    );
  }
   
   if (state.status === "success") {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg> 
          </div> 
          <h2 className="text-2xl font-bold text-green-800 mb-2">
            ¡Pago Confirmado!
          </h2>
          <p className="text-green-700 mb-2">
            Tu pedido ha sido procesado correctamente.
          </p>
          {state.orderDetails && (
            <p className="text-green-700 mb-6">
              Número de orden: <strong>{state.orderDetails.orderId}</strong>
            </p>
              )}
          <button
            onClick={ handleBackToHome } 
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Volver a la tienda
          </button>
        </div>  
      </div>
     );  
   }

  return (
    <div className="max-w-4xl mx-auto p-6">
    <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
      Finalizar Compra</h2>

      <CustomForm  onSubmit={onFormSubmit}> 
        <button  
            type="submit" 
            disabled={state.status === "loading"} 
            className={`px-8 py-3 cursor-pointer bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all shadow-md
              ${state.status === "loading" 
                ? 'opacity-70 cursor-not-allowed' 
                : 'hover:from-indigo-700 hover:to-blue-700 hover:shadow-lg transform hover:-translate-y-1'
              }`}
          >
          { state.status === "loading" ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Procesando...
            </span>
          ) : (
            'Confirmar Pago' 
          )}
          </button>  
      </CustomForm>
    </div>
  );
};
