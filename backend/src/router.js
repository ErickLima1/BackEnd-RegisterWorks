//Carregando Modulos
const express = require('express');
const registerControllers = require('./controllers/registerControllers');
const loginController = require('./controllers/authLoginControllers');
const obrasControllers = require('./controllers/obrasControllers');

const validationMiddlewares = require('./middlewares/validationMiddlewares');

//Criando Objetos com Modules;
const router = express.Router();

//Carregando Todas Rotas(registro)
router.get('/registerUser', registerControllers.getAllUsers);
router.post('/registerUser', validationMiddlewares.validateBody, registerControllers.createRegisterUser);
router.delete('/registerUser/:id', registerControllers.deleteUser);

//Carregando Rota(Login e cadastrar obras)
router.post('/login', validationMiddlewares.validateBodyLogin, loginController, (req, res) => {
    res.status(200).json({message: 'Usuário Logado!'});
});

//Carregando Rota Obras e seus middlewares
router.post('/obras', validationMiddlewares.validateBodyObras, obrasControllers.createObras);
router.get('/obras',  validationMiddlewares.validateBodyLogin, loginController, obrasControllers.getObrasById);
router.delete('/obras/:id',  obrasControllers.deleteObras);
router.put('/obras/:id', validationMiddlewares.validateBodyObras, obrasControllers.updateObras);


//Exportando modules
module.exports = router;