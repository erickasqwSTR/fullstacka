const Pais = require("../models/Pais");

// GET - Listar todos los países
const listarPaises = async (req, res) => {
    try {
        const paises = await Pais.query(); // select * from pais
        res.json(paises);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message, mensaje: "Error al listar países" });
    }
};

// POST - Insertar un país
const insertarPais = async (req, res) => {
    try {
        const { nombre, codigo } = req.body;
        const resultado = await Pais.query().insert({ nombre, codigo });
        console.log(`País añadido: ${resultado.nombre} (ID: ${resultado.id})`);
        res.status(201).json(resultado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message, mensaje: "Error al insertar país" });
    }
};

// PATCH - Actualizar parcialmente un país (NUEVO)
const actualizarPais = async (req, res) => {
    try {
        const { id } = req.params;
        const datosAActualizar = req.body;

        // 1. Modificamos el registro usando .patch().findById()
        // Esto devuelve la cantidad de filas afectadas (1 si lo encontró y cambió, 0 si no existe)
        const filasActualizadas = await Pais.query()
            .findById(id)
            .patch(datosAActualizar);

        // 2. Si es 0, en lugar de 404 hacemos un "upsert" simple: insertamos
        if (filasActualizadas === 0) {
            // Intentar crear un nuevo país con los datos enviados
            const nuevoPais = await Pais.query().insert(datosAActualizar);
            console.log(`País no encontrado. Se añadió uno nuevo: ${nuevoPais.nombre} (ID: ${nuevoPais.id})`);
            return res.status(201).json({ mensaje: "País no encontrado: se creó uno nuevo", data: nuevoPais });
        }

        // 3. Si se actualizó, buscamos el registro fresco para devolvérselo al cliente
        const paisActualizado = await Pais.query().findById(id);
        console.log(`País actualizado: ${paisActualizado.nombre} (ID: ${paisActualizado.id})`);

        res.status(200).json({
            mensaje: "País actualizado con éxito",
            data: paisActualizado
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message, mensaje: "Error al actualizar país" });
    }
};

// DELETE - Eliminar un país (NUEVO)
const eliminarPais = async (req, res) => {
    try {
        const { id } = req.params;

        const filasBorradas = await Pais.query().deleteById(id);

        if (filasBorradas === 0) {
            return res.status(404).json({ mensaje: "País no encontrado" });
        }

        res.status(200).json({ mensaje: `País con ID ${id} eliminado correctamente` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message, mensaje: "Error al eliminar país" });
    }
};

// ¡MIRA AQUÍ! Exportamos absolutamente todas las funciones para que las rutas las vean
module.exports = {
    listarPaises,
    insertarPais,
    actualizarPais,
    eliminarPais
};