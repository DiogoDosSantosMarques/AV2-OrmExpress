const prisma = require('@prisma/client').PrismaClient()
const bycript = require('bcrypt')
const jwt = require('jsonwebtoken')


const registrarUsuario = async (req, res) => {

    const {email, senha} = req.body

    // hash da senha
    const hashedSenha = await bycript.hash(senha, 10)


    try {

        const user = await prisma.usuario.create({

            data: {email, senha: hashedSenha}
            
        })

        res.status(201).json(user)
        
    } catch (error) {

        res.status(400).json({error: 'Usuario ja Existe'})
        
    }

}


const loginUsuario = async (req, res) => {

    const {email, senha} = req.body

    try {

        const user = await prisma.usuario.findUnique({

            where: {email}

        })

        if(user && (await bycript.compare(senha, usuario.senha))){

            const token = jwt.sign({userId: usuario.id}, 'secret-jwt', {expiresIn: '1h'})

            res.json(token)

        } else {
            res.status(401).json({error: 'Senha errada'})
        }
        
    } catch (error) {

        res.status(500).json({ error: 'Erro no servidor' });
        
    }

}


module.exports = {registrarUsuario, loginUsuario}