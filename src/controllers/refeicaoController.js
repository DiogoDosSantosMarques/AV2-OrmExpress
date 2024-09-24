const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()



const createRefeicao = async (req, res) => {

    const {nome, descricao, dataHora, dentroOuForaDaDieta} = req.body

    const usuarioId = req.usuarioId


    try {

        const refeicao = await prisma.refeicoes.create({
            data: {
                nome,
                descricao,
                dataHora: new Date(dataHora),
                dentroOuForaDaDieta,
                usuarioId
            }
        })

        res.status(201).json(refeicao)
        
    } catch (error) {

        res.status(400).json({ error: 'Erro ao criar refeição.' });
        
    }

}


const updateRefeicao = async (req, res) => {

    const {id} = req.params

    const {nome, descricao, dataHora, dentroOuForaDaDieta} = req.body

    const userId = req.usuarioId


    try {

        // verifica se a refeição é do usuário

        const refeicao = await prisma.refeicoes.findUnique({
            where: {id: parseInt(id) },
        })

        if(!refeicao || refeicao.usuarioId !== userId){
            return res.status(403).json({error: "Acesso negado"})
        }


        const updateRefeicao = await prisma.refeicoes.update({

            where:{id: parseInt(id)},

            data: {
                nome,
                descricao,
                dataHora: new Date(dataHora),
                dentroOuForaDaDieta
            },

        })

        res.json(updateRefeicao)


        
    } catch (error) {

        res.status(500).json({ error: 'Erro ao atualizar a refeição.' });
        
    }

}

const deleteRefeicao = async(req, res) => {
    const { id } = req.params;
    const userId = req.usuarioId;

try {

    const refeicao = await prisma.refeicoes.findUnique({
        where: { id: parseInt(id) },

    });

    if(!refeicao || refeicao.usuarioId !== userId) {
        return res.status(403).json({ error: 'Acesso negado.'});
    }

    await prisma.refeicoes.delete({
        where: { id: parseInt(id) },
    });

    res.status(200).json({message: 'Refeição deletada com sucesso'});
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar a refeição.' });
    }

};


const getRefeicaoById = async (req, res) => {

    const {id} = req.params
    const userId = req.usuarioId

    try {

        const refeicao = await prisma.refeicoes.findUnique({

            where:{id: parseInt(id)},

        })

        if (!refeicao || refeicao.usuarioId !== userId) {
            return res.status(404).json({ error: 'Refeição não encontrada ou acesso negado.' });
          }

          res.json(refeicao)
        
    } catch (error) {
                
        res.status(500).json({ error: 'Erro ao recuperar a refeição.' });
        
    }

}


const getRefeicoes = async (req, res) => {

    const usuarioId = req.usuarioId

    try {

        const refeicoes = await prisma.refeicoes.findMany({
            where: {usuarioId},
            orderBy: {dataHora: 'desc'}
        })
    
        res.json(refeicoes)
        
    } catch (error) {

        res.status(500).json({ error: 'Erro ao listar as refeições.' })
        
    }

}

module.exports = {createRefeicao, updateRefeicao, deleteRefeicao, getRefeicaoById, getRefeicoes}



