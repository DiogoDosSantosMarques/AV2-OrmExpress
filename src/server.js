const express = require("express")
const app = express()


const userRoutes = require('./routes/userRoutes')
const refeicoesRoutes = require('./routes/refeicoesRoutes')


app.use(express.json())

// rotas dos usuarios e das refeições

// Rota de registro e login
app.use('/users', userRoutes)

// rota de refeicoes
app.use('/refeicoes', refeicoesRoutes)

const PORT =  3333

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})