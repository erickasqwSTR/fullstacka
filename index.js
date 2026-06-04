const path = require("path");
const express = require("express");
const morgan = require("morgan");
const compression = require("compression");
require("./src/config/db");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(compression());

// Servir la interfaz gráfica desde public/
app.use(express.static(path.join(__dirname, "public")));

// Ruta para la página de depuración
app.get("/debug", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "debug.html"));
});

//importar las rutas
const saludoRoutes = require("./src/routes/saludo.routes");
const paisRoutes = require("./src/routes/pais.routes");
const usuarioRoutes = require("./src/routes/usuario.routes");
const debugRoutes = require("./src/routes/debug.routes");
//uso de rutas macro
app.use("/api", saludoRoutes);
app.use("/api/pais", paisRoutes);
app.use("/api/usuario", usuarioRoutes);
app.use("/api/debug", debugRoutes);

app.use(morgan("dev"));

const os = require("os");

app.listen(PORT, "0.0.0.0", () =>{
    // Mostrar información útil en la terminal para acceso desde otros dispositivos
    const interfaces = os.networkInterfaces();
    const addresses = [];
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                addresses.push(iface.address);
            }
        }
    }

    console.log(`Servidor escuchando en: http://0.0.0.0:${PORT}`);
    console.log(`Accesible desde esta máquina: http://localhost:${PORT}`);
    if (addresses.length > 0) {
        addresses.forEach(addr => console.log(`Accesible en la red: http://${addr}:${PORT}`));
    } else {
        console.log("No se detectaron IPs de red externas. Intenta con la IP de la máquina.");
    }
});