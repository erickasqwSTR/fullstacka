const Usuario = require("../models/Usuario");

const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.query();
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message, mensaje: "Error al listar usuarios" });
  }
};

const insertarUsuario = async (req, res) => {
  try {
    const { nombre, correo } = req.body;
    console.log("insertarUsuario", { nombre, correo });
    
    const usuarioCorreoExistente = await Usuario.query().where('correo', correo).first();
    if (usuarioCorreoExistente) {
      return res.status(409).json({ 
        error: `El correo "${correo}" ya está registrado en la base de datos`, 
        mensaje: "Error: usuario duplicado" 
      });
    }

    const usuarioNombreExistente = await Usuario.query().where('nombre', nombre).first();
    if (usuarioNombreExistente) {
      return res.status(409).json({ 
        error: `El nombre "${nombre}" ya está registrado en la base de datos`, 
        mensaje: "Error: usuario duplicado" 
      });
    }
    
    const resultado = await Usuario.query().insert({ nombre, correo });
    console.log(`Usuario añadido: ${resultado.nombre} (ID: ${resultado.id})`);
    res.status(201).json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message, mensaje: "Error al insertar usuario" });
  }
};

const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, correo } = req.body;
    console.log("actualizarUsuario", { id, nombre, correo });

    const usuario = await Usuario.query().findById(id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado", mensaje: "Error: usuario no existe" });
    }

    const correoExistente = await Usuario.query()
      .where('correo', correo)
      .whereNot('id', id)
      .first();

    if (correoExistente) {
      return res.status(409).json({ 
        error: `El correo "${correo}" ya está registrado en otro usuario`, 
        mensaje: "Error: correo duplicado" 
      });
    }

    const nombreExistente = await Usuario.query()
      .where('nombre', nombre)
      .whereNot('id', id)
      .first();

    if (nombreExistente) {
      return res.status(409).json({ 
        error: `El nombre "${nombre}" ya está registrado en otro usuario`, 
        mensaje: "Error: nombre duplicado" 
      });
    }

    const actualizado = await Usuario.query().patchAndFetchById(id, { nombre, correo });
    console.log(`Usuario actualizado: ${actualizado.nombre} (ID: ${actualizado.id})`);
    res.json({ mensaje: "Usuario actualizado correctamente", data: actualizado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message, mensaje: "Error al actualizar usuario" });
  }
};

const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.query().findById(id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado", mensaje: "Error: usuario no existe" });
    }

    await Usuario.query().deleteById(id);
    res.json({ mensaje: `Usuario eliminado correctamente` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message, mensaje: "Error al eliminar usuario" });
  }
};

module.exports = {
  listarUsuarios,
  insertarUsuario,
  actualizarUsuario,
  eliminarUsuario
};
