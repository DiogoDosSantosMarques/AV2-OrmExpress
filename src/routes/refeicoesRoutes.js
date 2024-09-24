const express = require("express")

const refeicaoController = require('../controllers/refeicaoController')

const authMiddleware = require("../middlewares/authMiddlewares")

const router = express.Router()


router.post("/", authMiddleware, refeicaoController.createRefeicao)
router.put('/:id', authMiddleware, refeicaoController.updateRefeicao)
router.delete("/:id", authMiddleware, refeicaoController.deleteRefeicao)
router.get("/:id", authMiddleware, refeicaoController.getRefeicaoById)
router.get("/", authMiddleware, refeicaoController.getRefeicoes)