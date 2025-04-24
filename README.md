# Shopping Cart App

Una aplicación de carrito de compras desarrollada con **React** y **TypeScript**. Este proyecto permite a los usuarios explorar productos, filtrarlos por categoría y agregarlos a un carrito de compras.

## Características

- **Listado de productos:** Visualiza productos con su imagen, precio y stock disponible.
- **Filtro por categoría:** Filtra productos según su categoría.
- **Carrito de compras:** Agrega productos al carrito y verifica su disponibilidad.
- **Diseño responsivo:** Adaptado para dispositivos móviles y de escritorio.
- **Botón de scroll hacia arriba:** Mejora la experiencia de navegación.

## Tecnologías utilizadas

- **React**: Biblioteca para construir interfaces de usuario.
- **TypeScript**: Superset de JavaScript para tipado estático.
- **React Router**: Manejo de rutas en la aplicación.
- **CSS**: Estilización personalizada.
- **Context API**: Manejo del estado global para el carrito y los filtros.

## Instalación

Sigue estos pasos para ejecutar el proyecto localmente:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   ```
2. Navega al directorio del proyecto:
   ```bash
   cd shopping-cart
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```
4. Inicia la aplicación:
   ```bash
   npm start
   ```

## Estructura del proyecto

```plaintext
src/
├── components/          # Componentes reutilizables
│   ├── Header/          # Encabezado de la aplicación
│   ├── Footer/          # Pie de página
│   ├── ShoppingCart/    # Componente del carrito de compras
│   ├── ShoppingCartList/ # Listado de productos
│   └── ...              # Otros componentes
├── context/             # Proveedores de contexto (estado global)
├── hooks/               # Hooks personalizados
├── mock/                # Datos de prueba (productos)
├── styles/              # Archivos CSS
└── App.tsx              # Componente principal
```

## Scripts disponibles

En el proyecto, puedes ejecutar los siguientes comandos:

- `npm start`: Inicia la aplicación en modo de desarrollo.
- `npm run build`: Construye la aplicación para producción.
- `npm test`: Ejecuta las pruebas (si están configuradas).

## Contribuciones

¡Las contribuciones son bienvenidas! Si deseas contribuir:

1. Haz un fork del repositorio.
2. Crea una rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz un commit (`git commit -m 'Agrega nueva funcionalidad'`).
4. Haz un push a tu rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia

Este proyecto está bajo la licencia [MIT](LICENSE).

---

¡Gracias por visitar este proyecto! Si te gusta, no olvides darle una ⭐ en GitHub.
```