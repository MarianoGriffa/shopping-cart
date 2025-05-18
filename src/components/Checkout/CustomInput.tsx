import { Control, Controller, FieldError } from "react-hook-form";
import { FormValues } from "../../models/form.model";

 interface InputData {
  name: keyof FormValues;             
  control: Control<FormValues>
  label: string;
  type?: string;
  error?: FieldError;   
  disabled?: boolean;
}
 

export const CustomInput = ({ name, label, type, control, error, disabled = false }: InputData) => {
  
  return (
   <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            id={name}
            type={type}
            disabled={disabled}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-all
              ${error 
                ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
              }
              ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-70' : ''}
            `}
          />
        )}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error.message}</p>
      )}
    </div>

  )

}
