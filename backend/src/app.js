const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const router = require('./router'); 
// const path = require('path');
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

app.use('/api-docs-ui', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(router);
//Exports Moudlo
module.exports = app;
