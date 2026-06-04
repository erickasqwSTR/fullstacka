const express = require("express");
const router = express.Router();//llamdo a la configuracion de rutas express
const {saludar,suma}=require("../controllers/saludo.controller")
router.get("/saludar",saludar);
router.get("/suma",suma);
module.exports=router;