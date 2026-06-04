# hola_presencial

Proyecto de ejemplo con Express, Objection y Knex.

Instrucciones rápidas:

1. Instala dependencias:

```bash
npm install
```

2. Si añadiste la dependencia `compression` manualmente, instálala también:

```bash
npm install compression
```

3. Ejecuta migraciones (si corresponde):

```bash
npm run migrate
```

4. Arranca en modo desarrollo (nodemon):

```bash
npm run dev
```

5. Endpoints útiles:

- `GET /api/pais` - listar países
- `POST /api/pais` - crear país
- `PATCH /api/pais/:id` - actualizar país (hice upsert si no existe)
- `GET /api/usuario` - listar usuarios
- `POST /api/usuario` - crear usuario
- `GET /api/debug` - resumen rápido de la base de datos (totales y muestras, protegido por usuario/contraseña)

Credenciales para acceder a la vista de base de datos:
- Usuario: `erickasqw`
- Contraseña: `11092006`

Para abrir la app desde un link público (sin usar solo localhost o IP local):

```bash
npm run tunnel
```

Esto usa `localtunnel` para exponer el servidor local en una URL pública temporal.

Subir a GitHub:

```bash
git init
git add .
git commit -m "Initial commit"
# Crear repo en GitHub y seguir las instrucciones para añadir remote
git remote add origin https://github.com/<tu-usuario>/<tu-repo>.git
git push -u origin main
```

Nota: abre el puerto `3000` en el firewall si quieres acceder desde otros dispositivos en la red.

## Despliegue en un servicio de hosting

### 1) Usar Render o Railway

- Crea un nuevo servicio Web en Render o Railway.
- Selecciona el repositorio `fullstacktest`.
- En el comando de build pon:
  ```bash
  npm install
  ```
- En el comando de start pon:
  ```bash
  npm start
  ```
- Configura variables de entorno:
  - `PORT=3000`
  - `DB_CLIENT=mysql2`
  - `DB_HOST` (host de MySQL)
  - `DB_PORT=3306`
  - `DB_USER` (usuario MySQL)
  - `DB_PASSWORD` (contraseña MySQL)
  - `DB_NAME` (nombre de la base de datos)
  - o bien `DATABASE_URL=mysql://user:password@host:port/dbname`

### 2) Con Docker

Si usas un servicio que acepta Docker, este proyecto ya tiene `Dockerfile`.

Construcción local:
```bash
docker build -t fullstacktest .
```
Correr local con variables:
```bash
docker run -e PORT=3000 -e DB_HOST=... -e DB_USER=... -e DB_PASSWORD=... -e DB_NAME=... -p 3000:3000 fullstacktest
```

### 2.1) Con Docker Compose (recomendado)

También puedes levantar la app y una base de datos MySQL juntas con `docker-compose`.

1. Asegúrate de tener Docker y Docker Compose instalados.
2. En la carpeta del proyecto ejecuta:
```bash
docker compose up -d
```
3. Eso levantará:
   - la app en `http://localhost:3000`
   - MySQL en el contenedor `fullstacktest_mysql`

Después del primer arranque, ejecuta las migraciones en el app:
```bash
docker compose exec app npm run migrate
```

Credenciales de ejemplo creadas por Docker Compose:
- host: `mysql`
- puerto: `3306`
- usuario: `appuser`
- contraseña: `apppass`
- base de datos: `pedidosp`

Si necesitas resetear la base de datos:
```bash
docker compose down -v
```

### 3) Cómo ver la base de datos en tu app

- `http://<host>:3000/api/debug` muestra totales y registros de prueba.
- `http://<host>:3000/api/pais` lista los países.
- `http://<host>:3000/api/usuario` lista los usuarios.

### 4) Recomendación

Para desplegar sin MySQL propio, usa un servicio que provea base de datos MySQL o MariaDB acompañante. Render y Railway permiten crear una base de datos administrada y luego conectar tu app con `DB_HOST`, `DB_USER` y demás.
