const express = require("express");
const router = express.Router();
const AuthController = require('../../controllers/auth/AuthController');

router.post('/sign-in', AuthController.signIn)

module.exports = router;

