# 🖋️ FlowInk - La Red Social para Amantes del Tatuaje

FlowInk es una plataforma web dedicada exclusivamente al mundo del tatuaje. Un espacio donde artistas y entusiastas pueden compartir diseños, interactuar y comercializar obras de arte digital de forma segura.

## 🚀 Características Principales

### Para Visitantes (Sin sesión iniciada)
* **Exploración Libre:** Visualiza el feed público con todos los tatuajes y diseños compartidos por la comunidad.
* **Vista Detallada:** Acceso a imágenes ampliadas, lectura de descripciones y visualización de métricas (conteo de likes y comentarios).
* **Transparencia:** Consulta de comentarios de otros usuarios en tiempo real.

### Para Usuarios Registrados
* **Perfil Personal:** Registro e inicio de sesión para una experiencia personalizada.
* **Gestión de Diseños:** Sube tus propios tatuajes directamente desde tu ordenador.
* **Interacción Social:** Capacidad para dar "Like" y escribir comentarios en las publicaciones de otros miembros.
* **Sistema de Venta:** Opción de publicar diseños para la venta con integración de precios.

## 🛡️ Innovación y Seguridad: El "Blur" de Protección
Para proteger el trabajo de los artistas, Tattoocial implementa un sistema de seguridad visual:
* **Protección Anti-Captura:** Si un tatuaje está marcado "Para la venta", la imagen aparecerá **difuminada (blurred)** tanto en el Home como en la vista de detalles.
* **Prevención de Plagio:** Esto evita que los diseños sean descargados o capturados sin pagar los derechos correspondientes al artista.

## 💳 Sistema de Pagos e eCommerce
La plataforma integra una pasarela de pagos segura y un flujo post-venta:
1.  **Stripe Integration:** Los usuarios pueden comprar diseños exclusivos a través de un botón de pago directo.
2.  **Payment Success:** Tras completar el pago, el comprador es redirigido a una página de éxito.
3.  **Acceso Exclusivo:** Solo tras la compra, la imagen se revela sin difuminado, permitiendo su visualización completa y habilitando un botón de **descarga en alta calidad**.

## 🛠️ Tecnologías Utilizadas
* **Frontend:** React.JS
* **Backend:** Express
* **Base de Datos:** MongoDB
* **Pasarela de Pagos:** Stripe API.
* **Almacenamiento de Imágenes:** Cloudinary

## ⚙️ Instalación

1. Clona el repositorio:
   ```bash
   git clone [https://github.com/tu-usuario/tattoocial.git](https://github.com/tu-usuario/tattoocial.git)
   ```

2. Instala las dependencias:
  ```bash
  npm install
  ```

3. Configura las variables de entorno (.env) con tus credenciales de Stripe y Base de Datos.

4. Ejecutar la aplicación:
  ```bash
  npm run dev
