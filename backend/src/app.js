const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
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

const options = { customCssUrl: '/public/css/swagger-ui.css' };

app.use('/api-docs-ui', (req, res, next) => {
    swaggerDocs.host = req.get('host');
    req.swaggerDoc = swaggerDocs;
    next();
}, swaggerUi.serve, swaggerUi.setup(swaggerDocs, options));

app.use('/public/css', express.static(path.join(__dirname, 'public/css/swagger-ui.css')));

//Exports Moudlo
module.exports = app;
