PROYECTO BACKEND Grupo 1

# **PROYECTO BACKEND Grupo 1**

## Backend

---

## Puesta en marcha de la app

1. Clonar el repositorio

```shell

git clone https://github.com/Markel-Fernandez-de-Labastida/Backend_ProyectBackendGroup1.git

```

2. Duplicar .env-template y renombra a .env

3. Instalar dependencias

- Express.
- ejs.
- cors.
- dotenv.
- bcrypt.
- express-validator.
- jsonwebtoken.
- pg

```shell
npm install
```

---

### Endpoints

Endpoints generales de la app:

- [GET] `/` Vista de inicio de la app
- [GET] `/dashboard` Panel de control
- [GET] `/search/:title` Vista detalle de la película
- [GET] `/search` Buscador de películas
- [GET] `/movies` Mis películas
- [POST] `/signup` Registrarse en la aplicación
- [POST] `/login` Hacer login en la aplicación
- [POST] `/logout` Salir
- [POST] `/createMovie` Crear película
- [PUT] `/editMovie/:id` Editar película
- [DELETE] `/removeMovie` Borrar película
- [GET] `/recoverpassword` Recuperar password
- [GET] `/restorepassword` Cambiar password

---

### Base de datos

![Diagrama lógica de la base de datos](./Readme_imgs\DB_img.png "Diagrama logica")

---

### Middlewares

Middlewares generales:

- Validar inputs
- Verificar rol
- Validar JWT

---

### Controllers

Authentication:

- Registrar usuario
- Loguear usuario
- Logout
- Recuperar contraseña
- Cambiar contraseña

Movies:

- Crear película
- Editar película
- Eliminar película
- Buscar película
- Detalles de la película
- Obtener favoritos/ mi lista

---

### Rutas

Authentication:

- log in
- sing up
- log out

Movies:

- Buscar película
- Crear película
- Modificar película
- Eliminar película

---

### Models

Usuarios:

- Quiery de Log in

Peliculas:

- Query de buscar película
- Query de crear película
- Query de modificar película
- Query de eliminar pelicula

---

### Utils

Utils:

- Conexión Base de datos
- Crear token
