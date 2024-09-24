const express = require("express")

const router = express.Router()

const refeicaoController = require('../controllers/refeicaoController')

const authMiddleware = require("../middlewares/authMiddlewares")




router.post("/", authMiddleware, refeicaoController.createRefeicao)
router.put('/:id', authMiddleware, refeicaoController.updateRefeicao)
router.delete("/:id", authMiddleware, refeicaoController.deleteRefeicao)
router.get("/:id", authMiddleware, refeicaoController.getRefeicaoById)
router.get("/", authMiddleware, refeicaoController.getRefeicoes)


module.exports = router