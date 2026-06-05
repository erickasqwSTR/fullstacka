const express = require('express');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
require('dotenv').config();

// Configuración de la base de datos y binding de Objection
require('./src/config/db');

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(compression());

// Rutas
app.use('/api/pais', require('./src/routes/pais.routes'));
app.use('/api/usuario', require('./src/routes/usuario.routes'));
app.use('/api/saludo', require('./src/routes/saludo.routes'));
app.use('/api/debug', require('./src/routes/debug.routes'));

// Ruta de prueba
app.get('/', (req, res) => res.send('Servidor Activo y Conectado'));

// Manejador de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Error interno del servidor',
    detalle: err.message
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));