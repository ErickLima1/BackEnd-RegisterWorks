const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

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

const ROOT_FOLDER = path.join(__dirname, '.');
const SRC_FOLDER = path.join(ROOT_FOLDER, 'src');

const options = { customCssUrl: '/public/swagger-ui.css', customSiteTitle: 'API - Cadastro - Swagger' };

// Middleware para definir o tipo MIME correto para o arquivo CSS
app.use('/public', express.static(path.join(SRC_FOLDER, 'public'), {
    setHeaders: (res, filePath) => {
        if (path.extname(filePath) === '.css') {
            res.setHeader('Content-Type', 'text/css');
        }
    }
}));

// Rota para o Swagger UI
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocs, options));

app.use(router);

//Exports Moudlo
module.exports = app;
