const express = require("express");
const router = express.Router();
const login =require("../controller/userlogin.controller");

router.post("/userlogin",login.userLogin);

module.exports = router;