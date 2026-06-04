const express = require("express");
const router = express.Router();
const paisController = require("../controllers/pais.controller");

const validate = require("../middlewares/validate");
const { updatePaisSchema, idParamSchema } = require("../validators/pais.validator");

// Rutas base
router.get("/", paisController.listarPaises);
router.post("/", paisController.insertarPais);

// PATCH - Usando los nombres exactos que exportamos
router.patch("/:id", 
    validate(idParamSchema, "params"), 
    validate(updatePaisSchema, "body"), 
    paisController.actualizarPais
);

// DELETE - Usando los nombres exactos que exportamos
router.delete("/:id", 
    validate(idParamSchema, "params"), 
    paisController.eliminarPais
);
module.exports = router;