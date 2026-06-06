const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuario.controller");

router.get("/", usuarioController.listarUsuarios);
router.post("/", usuarioController.insertarUsuario);
router.patch("/:id", usuarioController.actualizarUsuario);
router.put("/:id", usuarioController.actualizarUsuario);
router.delete("/:id", usuarioController.eliminarUsuario);

module.exports = router;
