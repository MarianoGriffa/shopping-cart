import { useFilter } from '../../context';
 
export const FilterCategory = () => { 
  const { categoryFilter, setCategoryFilter, categories , formatCategoryName } = useFilter();
     
  return ( 
    <div className="flex justify-center flex-wrap gap-4 py-5 bg-[#FFF4FF]" >
      { 
       categories.map(category => ( 
        <button  
          key={category}  
          onClick={() => setCategoryFilter(category)} 
          className={ categoryFilter === category ? 'px-4 py-2 border border-blue-500 bg-blue-500 text-white rounded-full cursor-pointer font-medium transition-all duration-200 hover:bg-blue-600' : 'px-4 py-2 border border-gray-300 bg-gray-100 rounded-full cursor-pointer font-medium transition-all duration-200 hover:bg-gray-200'} 
        >         
          {formatCategoryName(category)}
        </button> 
      ))}  
    </div>
  )
}
 
