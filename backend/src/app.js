//Carregando Modulos
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
//Importando os modulos swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger.json');

//Importando Router
const router = require('./router');

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

// Rota para o Swagger UIi
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//Rota para servir o Swagger UI
app.use('/api-docs', swaggerUi.serve, (req, res, next) => {
    res.setHeader('Content-Type', 'text/html');
    next();
}, swaggerUi.setup(swaggerDocs, { customCss: '.swagger-ui .wrapper { display: flex; justify-content: center; align-items: center; height: 100vh; }' }));

// Servir arquivos estáticos do Swagger UI
app.use('/api-docs/swagger-ui.css', (req, res, next) => {
    res.setHeader('Content-Type', 'text/css');
    next();
}, express.static(__dirname + '/node_modules/swagger-ui-dist/swagger-ui.css'));


app.use(router);

//Exports Moudlo
module.exports = app;
