const prisma = require('@prisma/client').PrismaClient()


const createRefeicao = async (req, res) => {

    const {nome, descricao, dataHora, dentroOuForaDaDieta} = req.body

    const userId = req.usuarioId


    try {

        const refeicao = await prisma.refeicoes.create({
            data: {
                nome,
                descricao,
                dataHora: new Date(dataHora),
                dentroOuForaDaDieta,
                userId
            }
        })

        res.status(201).json(refeicao)
        
    } catch (error) {

        res.status(400).json({ error: 'Erro ao criar refeição.' });
        
    }

}