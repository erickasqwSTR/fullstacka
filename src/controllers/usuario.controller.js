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
    
    // Verificar si ya existe un usuario con el mismo correo
    const usuarioExistente = await Usuario.query().where('correo', correo).first();
    if (usuarioExistente) {
      return res.status(409).json({ 
        error: `El correo "${correo}" ya está registrado en la base de datos`, 
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

module.exports = {
  listarUsuarios,
  insertarUsuario
};
