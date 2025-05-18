import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema } from '../../models/form.model';
import { FormValues } from '../../models/form.model';
import { CustomInput } from './CustomInput';
import { ReactNode } from 'react';

interface CustomFormProp {
  children: ReactNode;
  disabled?: boolean; 
  onSubmit: SubmitHandler<FormValues>;
} 

// manejamos la lógica del formulario usando react-hook-form y zod.
 export const CustomForm = ({children, disabled = false, onSubmit }: CustomFormProp) => {

const { control, handleSubmit, formState: {errors} } = useForm<FormValues>({
  resolver: zodResolver(schema),
  mode: 'onBlur',
  defaultValues: {
    firstName: "",
     lastName: "",
     email: "",
     address: "",
     city: "",
     postalCode: "",
     cardNumber: "",
     expiryDate: "", 
     cvv: ""
   }
  });  
  

   return (
  <form onSubmit={handleSubmit(onSubmit)}  className="space-y-8" aria-disabled={disabled}>
  <div className="grid grid-cols-1 gap-6 md:grid md:grid-cols-2 md:grid-rows-[auto_auto]">
 
    <div className="bg-gray-50 p-6 rounded-lg space-y-4">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Información Personal</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CustomInput
          name="firstName"
          label="Nombre"
          type="text"
          control={control}
          error={errors.firstName}
          disabled={disabled}
        />
        <CustomInput
          name="lastName"
          label="Apellido"
          type="text"
          control={control}
          error={errors.lastName}
          disabled={disabled}
        />
      </div>
      <div className="grid grid-cols-1 gap-4">
        <CustomInput
          name="email"
          label="Correo Electrónico"
          type="email"
          control={control}
          error={errors.email}
          disabled={disabled}
        />
      </div>
    </div>

    <div className="bg-gray-50 p-6 rounded-lg space-y-4">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Dirección de Envío</h3>
      <div className="grid grid-cols-1 gap-4">
        <CustomInput
          name="address"
          label="Dirección"
          type="text"
          control={control}
          error={errors.address}
          disabled={disabled}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CustomInput
          name="city"
          label="Ciudad"
          type="text"
          control={control}
          error={errors.city}
          disabled={disabled}
        />
        <CustomInput
          name="postalCode"
          label="Código Postal"
          type="text"
          control={control}
          error={errors.postalCode}
          disabled={disabled}
        />
      </div>
    </div>

    <div className="bg-gray-50 p-6 rounded-lg space-y-4 md:col-span-2">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Información de Pago</h3>
      <div className="grid grid-cols-1 gap-4">
        <CustomInput
          name="cardNumber"
          label="Número de Tarjeta"
          type="text"
          control={control}
          error={errors.cardNumber}
          disabled={disabled}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CustomInput
          name="expiryDate"
          label="Fecha de Expiración (MM/AA)"
          type="text"
          control={control}
          error={errors.expiryDate}
          disabled={disabled}
        />
        <CustomInput
          name="cvv"
          label="CVV"
          type="text"
          control={control}
          error={errors.cvv}
          disabled={disabled}
        />
      </div>
    </div>

  </div>
      <div className="mt-6 flex justify-center">{children}</div>     
    </form> 
    ) 
  };
