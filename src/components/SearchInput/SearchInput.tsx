import { useFilter } from '../../context';
import { ChangeEvent } from '../../types';
    
export const SearchInput = () => {
  
const { nameFilter, setNameFilter } = useFilter();

  const handleChange = (event: ChangeEvent) => {
    const value = event.target.value;
    setNameFilter(value);      
  };    

  return (  
    <div className="flex justify-center items-start py-5 w-96">
    <input
      type="text"
      value={nameFilter}
      onChange={handleChange}
      placeholder="Busca productos"
      className="w-full py-3 px-3 text-base border-2 border-gray-300 rounded-full transition-colors duration-300 focus:border-blue-500 focus:outline-none"
      aria-label="Buscar productos"
    />
  </div>
  )

}
