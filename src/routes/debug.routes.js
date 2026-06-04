const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const { resumenDB } = require("../controllers/debug.controller");

router.get("/", auth, resumenDB);

module.exports = router;
