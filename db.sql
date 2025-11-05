CREATE DATABASE project_auth_roles CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE project_auth_roles;

-- Tabla Roles
CREATE TABLE roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE
);

-- Tabla Estados
CREATE TABLE status (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE
);

-- Tabla Usuarios
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  username VARCHAR(100) NOT NULL UNIQUE,
  phone VARCHAR(20),
  birthDate DATE NOT NULL,
  registerDate DATETIME DEFAULT CURRENT_TIMESTAMP,
  age INT,
  gender ENUM('masculino', 'femenino', 'otro') NOT NULL,
  password VARCHAR(200) NOT NULL,
  roleId INT,
  statusId INT,

  CONSTRAINT fk_user_role FOREIGN KEY (roleId) REFERENCES roles(id),
  CONSTRAINT fk_user_status FOREIGN KEY (statusId) REFERENCES status(id)
);
