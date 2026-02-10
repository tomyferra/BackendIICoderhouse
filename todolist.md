# To-Do List del Proyecto

## Aspectos a Incluir

- [x] **Modelo de Usuario**: Crear un modelo User con los campos:
    - [x] first_name: String
    - [x] last_name: String
    - [x] email: String (único)
    - [x] age: Number
    - [X] password: String (hash)
    - [X] cart: Id referencia a Carts
    - [x] role: String (default: 'user')

- [X] **Encriptación de Contraseña**: Utilizar el paquete bcrypt para encriptar la contraseña del usuario mediante el método hashSync.

- [x] **Estrategias de Passport**: Desarrollar las estrategias de Passport para que funcionen con el modelo de usuarios creado.

- [x] **Sistema de Login**: Implementar un sistema de login del usuario que trabaje con JWT (JSON Web Tokens).

- [x] **Ruta de Validación**: Agregar al router `/api/sessions/` la ruta `/current`, que validará al usuario logueado y devolverá en una respuesta sus datos asociados al JWT.

## Criterios

- [x] **Modelo de Usuario y Encriptación de Contraseña**:
    - [X] Crear modelo User con los campos especificados y implementar encriptación (bcrypt.hashSync).
    - [x] Que el modelo User incluya todos los campos requeridos.
    - [X] Que la contraseña se encripte correctamente y se almacene segura.

- [x] **Estrategias de Passport para Autorización y Autenticación**:
    - [x] Estrategias de Passport desarrolladas y configuradas para el modelo de usuarios.
    - [x] Estrategias correctamente configuradas para autenticación/autorización.
    - [x] Implementada estrategia para autenticación JWT.

- [x] **Sistema de Login y Generación de Token JWT**:
    - [x] Sistema de login permite autenticarse y generar token JWT válido.
    - [x] Usuarios inician sesión exitosa y se asigna token.
    - [x] Token válido para acciones protegidas.

- [x] **Estrategia "Current" y Endpoint /api/sessions/current**:
    - [x] Implementar estrategia "current" para validar usuario y extraer datos.
    - [x] Estrategia extrae usuario del token JWT efectivamente.
    - [x] Token inválido devuelve error apropiado.
    - [x] Endpoint funciona y devuelve datos del usuario.
