const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuario.controller");

router.get("/", usuarioController.listarUsuarios);
router.post("/", usuarioController.insertarUsuario);

module.exports = router;
