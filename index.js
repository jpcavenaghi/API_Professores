const express = require('express'),
    server = express(),
    bodyparser = require('body-parser');
require('express-async-errors')

const db = require('./db'),
    professoresRoutes = require('./controllers/professoresController')

server.use(bodyparser.json())
server.use('/api/professores', professoresRoutes)
server.use((err,req,res,next) => {
    console.log(err)
    res.status(err.status || 500).send('Algo está errado!')
})

db.query("SELECT 1").then(() => {
    console.log('Conectado ao banco de dados');
    server.listen(3000,
        () => console.log('Servidor aberto'))
    }).catch(err => console.log('Conexao ao banco falhou \n' + err))