# Proyecto: Autenticación con Spring Boot 17 y Angular

Este proyecto es un template listo para usar con autenticación manual y mediante Google en un stack basado en **Spring Boot 17** y **Angular**.

## Características
- Autenticación manual con usuario y contraseña.
- Inicio de sesión con Google mediante OAuth 2.0.
- Backend en **Spring Boot 17** con **Spring Security**.
- Frontend en **Angular** con **JWT** para la gestión de sesiones.
- Protección de rutas con Guards en Angular.

## Tecnologías Utilizadas
### Backend (Spring Boot 17)
- Java 17
- Spring Boot 17
- Spring Security
- OAuth 2.0 (Google)
- JWT (Json Web Token)
- JPA / Hibernate
- PostgreSQL / MySQL (configurable)

### Frontend (Angular)
- Angular 17+
- Angular Router
- Angular Guards
- Bootstrap 


## Uso
- **Registro y Login Manual**: Los usuarios pueden registrarse e iniciar sesión con su email y contraseña.
- **Login con Google**: Los usuarios pueden autenticarse con su cuenta de Google.

## Endpoints Principales (Backend)
| Método | Endpoint | Descripción |
|---------|----------|--------------|
| POST | `/auth/register` | Registro de usuarios |
| POST | `//auth/login` | Inicio de sesión manual |
| OST | `/auth/google-login` | Inicio de sesión con Google |


## Contacto
Si tienes dudas o sugerencias, contáctame en [zambottinico@gmail.com](mailto:zambottinico@gmail.com).

---
**Autor:** Nicolas Herrera 
**Licencia:** MIT

