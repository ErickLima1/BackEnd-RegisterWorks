//Carregando Modulos
const express = require('express');
const registerControllers = require('./controllers/registerControllers');
const validationMiddlewares = require('./middlewares/validationMiddlewares');
// const validationLoginMiddlewares = require('./middlewares/validationLoginMiddlewares');

//Criando Objetos com Modules;
const router = express.Router();

//Carregando Todas Rotas(registro)
router.get('/registerUser', registerControllers.getAll);
router.post('/registerUser', validationMiddlewares.validateBody, registerControllers.createRegister);
router.delete('/registerUser/:id', registerControllers.deleteUser);

router.post('/login');


//Exportando modules
module.exports = router;