const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger.json');

//Importando Router
const router = require('./router'); 

//Criando Objetos com Modulos
const app = express();

//Statico public com swagger-ui.response-control-media-type__accept-message
app.get('/api-docs-ui/swagger-ui.css', (req, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname, 'public/swagger-ui.css'));
});

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

// Rota do api-docs-ui swagger com minha documentação.
app.use('/api-docs-ui', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


//Rota do meu router.js
app.use(router);
//Exports Moudlo
module.exports = app;
