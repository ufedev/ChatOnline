# Sistema de chat básico

### Cuenta con la creación de usuarios random cada vez que se recarga la pagina.

Se puede implementar usuarios por base de datos fácilmente.
Ya contiene recuperación de chat de base de datos MongoDB

## Crear proyecto

```bash

git clone https://github.com/ufedev/ChatOnline.git
cd ChatOnline

```

## Configuración previa.

Agregar archivo .env y variable de entorno MONGODB

```bash

echo 'MONGODB=mongodb://localhost:27017/<tudb>' > .env

```

## Pruebas en local

```bash

npm install
npm run dev

```

### Imagen de muestra

![Imagen de muestra](https://raw.githubusercontent.com/ufedev/ChatOnline/main/muestra.png)
