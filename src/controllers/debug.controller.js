const Pais = require("../models/Pais");
const Usuario = require("../models/Usuario");

const resumenDB = async (req, res) => {
  try {
    const totalPaises = await Pais.query().resultSize();
    const totalUsuarios = await Usuario.query().resultSize();

    const paises = await Pais.query().limit(10);
    const usuarios = await Usuario.query().limit(10);

    res.json({
      totals: {
        paises: totalPaises,
        usuarios: totalUsuarios,
      },
      sample: {
        paises,
        usuarios,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message, mensaje: "Error al consultar DB" });
  }
};

module.exports = {
  resumenDB,
};
