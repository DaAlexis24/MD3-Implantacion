# Test - Backend

## Repo

En describe colocamos el given de lo que queremos testear, en el caso de films será la clase Film Repo

### Given - When - Then

Esto se usa cuando queremos testear una gran estructura que tiene otras estructuras dentro

### Asíncronia en el test

Se puede realizar esto a la hora de querer testear una Promesa

### Funciones en el test

Tienen mecanismos que nos permiten configurar la función para que hagan y se comporten como queramos

## Recomendaciones para utilizar este proyecto

- El .env se escribe de la siguiente manera: `DATABASE_URL="mysql://root:admin@localhost:3306/movies_test"`. Donde _root_ es el **user** y _admin_ es la **contraseña**
- Luego de ello ejecuta `npx prisma generate` para el cliente de Prisma y así no tener problemas de importaciones
- Siguiente, enciende tu servidor MySQL
- Para finalizar, en la terminal escribe `npx prisma migrate dev --name init` para generar la migración y así obtener nuestra BBDD gracias a Prisma
