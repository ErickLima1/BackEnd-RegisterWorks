const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger.json');

//Importando Router

//Criando Objetos com Modulos
const app = express();
app.use(express.json());
app.use(cors());

//body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//configurando o middleware express-session
app.use(session({
    secret: 'te-heO92fRLwk1Dt0Wghzg',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// const path = require('path');

// Servir arquivos estáticos
// Serve arquivos estáticos
// Serve arquivos estáticos
app.use(express.static('public'));

// Configurar rota do Swagger UI
app.use('/api-docs-ui', swaggerUi.serve);
app.get('/api-docs-ui', swaggerUi.setup(swaggerDocs));

//Exports Moudlo
module.exports = app;
