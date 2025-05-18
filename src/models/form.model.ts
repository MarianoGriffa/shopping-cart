import { z } from 'zod';

export const schema = z.object({
  firstName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  lastName: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
  email: z.string().email("Ingrese un correo electrónico válido"),
  address: z.string().min(4, "La dirección debe ser más detallada"),
  city: z.string().min(1, "La ciudad debe ser obligatoria"),
  postalCode: z.string().regex(/^[0-9]{5}(?:-[0-9]{5})?$/, "Formato incorrecto (Ej: 12340)"),
  cardNumber: z.string().regex(/^[0-9]{13,19}$/, "Número de tarjeta inválido"),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 
    "Formato debe ser MM/AA (Ej: 12/25)"),
  cvv: z.string().regex(/^[0-9]{3}$/, "El CVV debe tener 3 dígitos"),
});
//me ahorro el doble tipado
export type FormValues = z.infer<typeof schema>;