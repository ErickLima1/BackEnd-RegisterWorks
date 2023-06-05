//Carregando Modulos
const express = require('express');
const registerControllers = require('./controllers/registerControllers');
const loginController = require('./controllers/authLoginControllers');
const obrasControllers = require('./controllers/obrasControllers');

const validationMiddlewares = require('./middlewares/validationMiddlewares');

//Criando Objetos com Modules;
const router = express.Router();

//Carregando Todas Rotas(registro)
router.get('/registerUser', registerControllers.getAll);
router.post('/registerUser', validationMiddlewares.validateBody, registerControllers.createRegister);
router.delete('/registerUser/:id', registerControllers.deleteUser);

router.post('/login', loginController);

router.get('/obras', loginController, obrasControllers.getObrasById);


//Exportando modules
module.exports = router;