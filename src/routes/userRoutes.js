const express = require("express")

const userController = require('../controllers/userController')

const router = express.Router()

router.post('/registrar', userController.registrarUsuario)
router.post('/login', userController.loginUsuario)

module.exports = router