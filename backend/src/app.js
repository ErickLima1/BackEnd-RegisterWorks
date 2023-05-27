//Carregando Modulos
const express = require('express');
const cors = require('cors');

//Importando Router
const router = require('./router');


//Criando Objetos com Modulos
const app = express();
app.use(express.json());
app.use(cors());

app.use(router);

app.get('/', (req, res) => {
    res.status(200).send('Ola Mundo!');
});

//Exports Moudlo
module.exports = app;