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
        
        // Verificar si ya existe un país con el mismo nombre o código
        const paisNombreExistente = await Pais.query().where('nombre', nombre).first();
        if (paisNombreExistente) {
            return res.status(409).json({ 
                error: `El país "${nombre}" ya existe en la base de datos`, 
                mensaje: "Error: país duplicado" 
            });
        }

        const paisCodigoExistente = await Pais.query().where('codigo', codigo).first();
        if (paisCodigoExistente) {
            return res.status(409).json({ 
                error: `El código ISO "${codigo}" ya está registrado para otro país`, 
                mensaje: "Error: código duplicado" 
            });
        }
        
        const resultado = await Pais.query().insert({ nombre, codigo });
        console.log(`País añadido: ${resultado.nombre} (ID: ${resultado.id})`);
        res.status(201).json(resultado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message, mensaje: "Error al insertar país" });
    }
};

// PATCH - Actualizar parcialmente un país
const actualizarPais = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, codigo } = req.body;

        // Verificar si el país existe
        const paisActual = await Pais.query().findById(id);
        if (!paisActual) {
            return res.status(404).json({ mensaje: "País no encontrado" });
        }

        // Verificar duplicados en nombre y código
        if (nombre && nombre !== paisActual.nombre) {
            const paisNombreDuplicado = await Pais.query()
                .where('nombre', nombre)
                .whereNot('id', id)
                .first();
            if (paisNombreDuplicado) {
                return res.status(409).json({ 
                    error: `El país "${nombre}" ya existe en la base de datos`, 
                    mensaje: "Error: país duplicado" 
                });
            }
        }

        if (codigo && codigo !== paisActual.codigo) {
            const paisCodigoDuplicado = await Pais.query()
                .where('codigo', codigo)
                .whereNot('id', id)
                .first();
            if (paisCodigoDuplicado) {
                return res.status(409).json({ 
                    error: `El código ISO "${codigo}" ya está registrado para otro país`, 
                    mensaje: "Error: código duplicado" 
                });
            }
        }

        // Actualizar el país
        const datosAActualizar = {};
        if (nombre) datosAActualizar.nombre = nombre;
        if (codigo) datosAActualizar.codigo = codigo;

        await Pais.query().findById(id).patch(datosAActualizar);
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