# CRUD  de Notas MERN

Este es un proyecto CRUD (Crear, Leer, Actualizar, Eliminar) de notas, donde las notas están disponibles para todos los usuarios para vizualizacion y para modificar o eliminar se debe iniciar sesión. Los usuarios iniciar sesión, y todas las peticiones se hacen con la autorización por cabecera de JSON Web Token (JWT)

![notes](./images/notesWithOutLogin.png)

![Notes with login](./images/Logeado.png)

![modal edir note](./images/modal.png)

## Tecnologías utilizadas

Este proyecto fue creado con el stack MERN (MongoDB, Express, React y Node.js). Las dependencias de producción del backend incluyen bcrypt, cors, dotenv, cross-env, express, jsonwebtoken, mongoose, mongoose-unique-validator. En el frontend, el proyecto fue creado con `npx create-app-[nombre]` y las dependencias de producción incluyen axios, bootstrap, react-bootstrap, react-icons, react-router-dom.

## Backend

El Backend se realizo utilizando Node.js en conjunto con Express

- Rutas: Los endpoints de los usuarios, notas y login se refactorizaron en rutas (middleware). Cada una de estas rutas tiene que pasar por la libreria cors.
- Encriptado: Al crear un usuario, la contraseña es encriptada con bcrypt
- Token: Al crear el usuario tambien se crea un token para ese usuario que es retornado en el cuerpo de la repuesta.
- Base de datos: Los datos tanto del usuario como las notas fueron guardadas en MongoDB
- Autentificacion: se autentifica que las credenciales usadas esten e las base de datos
- Autorizacion: Para las acciones de crear, actualizar y eliminar se comprueba que se reciba un token que pueda ser decifrado con la clave interna, si no cumple la condicion quiere decir que no esta autorizado para realizar tal accion.
- Formatter: El código está formateado con una configuración de ESLint.
- Test unitarios: se realizaron test unitarios a los usuarios, notas y login

## Frontend 

En el frontend, el proyecto está hecho con React y se Bootstrap para estilar. 

- Peticiones asincronicas: Para las peticiones asíncronas se utilizó la libreria de `axios`, haciendo uso tanto de funciones `async/await` como también de promesas.
- Enrutamiento: Se hizo uso de react router dom, para las diferentes direcciones, ademas se agrego renderizado condicional dependiendo si se ha iniciado sesión 
- Custom Hooks: Se hizo uso de customs Hooks
- Test: Se realizaron test unitarios de diferentes componentes con Jest-dom
- Test E2E: se realizaron tests E2E con cypress para probar la funcionalidad de la aplicación
- Persistencia de datos: los datos de retornados por la api(token) son guardados de manera local en localStorage


## Requisitos previos

Antes de instalar y utilizar este proyecto, tiene que tener en cuenta que debe tener una cuenta en mongoDB para utilizar sus proprias varibles de entorno, si no dispone de uno podra probar la funcionalidad del codigo en el link de despliegue.

## Instalacíon

Para instalar este proyecto en tu equipo local, sigue estos pasos:
1. Clona este repositorio en tu equipo local.
2. Navega hasta el directorio del proyecto y ejecuta `npm install` para instalar todas las dependencias, esto debe realizarse tanto en la carpeta de app y Api.
3. Crea un archivo `.env` en el directorio de la Api y app del proyecto y agrega tus variables de entorno.
    - Las variables de entorno de la Api son:
      
        - PORTDEVELOPMENT , puerto del servidor para desarrollo/produccion
        - PORTTEST , puerto del servidor para testeo
        - SECRET ,  clave para decifrar los token recibidos por cabecera
        - MONGO_DB_URI , conexion a mongoDB
        - MONGO_DB_URI_TEST , conexion a mongoDB para los test

4. Crea una cuenta en mongoDB y agrega las correspondientes variables de entorno.
5. Ejecuta `npm run build` para instalar todas las dependecias, luego se procede a iniciar la app y el servidor con `npm run start`.
    
## Uso 

Para utilizar este proyecto, sigue estos pasos:
1. Abre tu navegador web y navega hasta http://localhost:3000, donde podras ver todas las notas que han agregados los usuarios mas no interactuar con ellas.
2. Crea una cuenta de usuario en mongoDB o envia una petición Post a: http://localhost:3001/api/users/ con la estrucuta json:
   {
    	"username":"",
	"name": "",
	"password": "",
    	"confirmPassword": ""
   }
4. Tambien puedes visitar la pagina: 
, en cambio si vas a probar la pagina web del proyecto utliza las siguientes credenciales usuario:admin123 , contraseña: admin123.
5. Una vez que hayas iniciado sesión, podrás crear, actualizar y eliminar notas.
