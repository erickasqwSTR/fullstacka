const express = require("express");
const router = express.Router();
const { resumenDB } = require("../controllers/debug.controller");

router.get("/", resumenDB);

module.exports = router;
