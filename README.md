# Project Auth Roles - Node.js & Express

![Node.js](https://img.shields.io/badge/Node.js-16.x-green) ![Express](https://img.shields.io/badge/Express-4.x-blue) ![Sequelize](https://img.shields.io/badge/Sequelize-6.x-orange)

Sistema de gestión de usuarios con autenticación, roles y dashboard administrativo utilizando Node.js, Express, Sequelize y MySQL.

---

## 📝 Descripción

Este proyecto permite:

- Registro y login de usuarios.
- Gestión de roles (`admin`, `user`) y estados (`active`, `inactive`).
- Dashboard administrativo con sidebar y navbar.
- CRUD de usuarios con roles y estados.
- Protección de rutas mediante middleware de autenticación.
- Manejo de mensajes flash para feedback de usuario.

Es un ejemplo completo de cómo estructurar un proyecto de Node.js con autenticación basada en roles y vistas con EJS.

---

## ⚙️ Tecnologías

- Node.js
- Express
- Sequelize ORM
- MySQL
- EJS + EJS Mate
- Tailwind CSS (para estilos)
- bcrypt (para hash de contraseñas)
- express-session y connect-flash (para sesiones y mensajes flash)
- dotenv (variables de entorno)
