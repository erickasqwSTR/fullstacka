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
- `GET /api/debug` - resumen rápido de la base de datos (totales y muestras)

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
