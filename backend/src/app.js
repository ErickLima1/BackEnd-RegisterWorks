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

//Statico - talves resolva o problema do MIME
app.use('/api-docs/swagger-ui.css', express.static(__dirname + '/node_modules/swagger-ui-dist/swagger-ui.css'));

app.use(router);

//Exports Moudlo
module.exports = app;
