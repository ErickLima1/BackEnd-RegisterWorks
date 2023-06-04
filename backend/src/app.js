//Carregando Modulos
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');

//Importando Router
const router = require('./router');


//Criando Objetos com Modulos
const app = express();
app.use(express.json());
app.use(cors());


//configurando o middleware express-session
app.use(session({
    secret: 'putaMerdaCaralho',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(router);

app.get('/', (req, res) => {
    res.status(200).send('Ola Mundo!');
});

//Exports Moudlo
module.exports = app;