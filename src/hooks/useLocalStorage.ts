
// Key, lugar donde guardamos el valor del localstorage
// T ,Valor generico de toda la app, admite cualquier tipo de datos
// initialValue, valor inicial que va recibir mi localStorage
//El hook retorna una tupla [ T, () => ] similar al useState
import { useEffect, useState } from 'react'; 

  export function useLocalStorage<T>(key: string, initialValue: T):  
  [T, ( value: T | ((val: T) => T) ) => void]  { 
     
    //Iniciamos el estado 
  const readValue = ():T  => {

    try {
      // Obtener del localStorage
      const item = localStorage.getItem(key);
      // Devolver el valor parseado o el valor inicial si no existe
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {

      console.error(`Error al recuperar ${key} de localStorage:`, error);
      return initialValue;
    }
  }
   // Estado para almacenar el valor actual
   const [valueStored , setValueStored] = useState<T>(readValue)
      
    //Actualizamos el valor
    const  SetValue = (value: T | ((val: T) => T)) => { 
      
      try {
        // Permitir que el valor sea una función (como en setState)
        const valueToStore = value instanceof Function ? value(valueStored) : value;
        
        // Guardar en el estado
        setValueStored(valueToStore);
        
        // Guardar en localStorage
        localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(`Error al guardar ${key} en localStorage:`, error);
      }

    }
   // Efecto para sincronizar con otros posibles componentes que usen el mismo key
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue) {
        try {
          setValueStored(JSON.parse(event.newValue));
        } catch (e) {
          console.error(`Error al procesar cambio en localStorage para ${key}:`, e);
        }
      }
    };
      // Suscribirse a cambios en el storage
      window.addEventListener('storage', handleStorageChange);
      
      // Limpieza
      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
  }, [key]);
     
    
    return [ valueStored, SetValue ] 
  }
   