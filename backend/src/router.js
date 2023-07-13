//Carregando Modulos
const express = require('express');
const registerControllers = require('./controllers/registerControllers');
const loginController = require('./controllers/authLoginControllers');
const obrasControllers = require('./controllers/obrasControllers');

const validationMiddlewares = require('./middlewares/validationMiddlewares');

//Criando Objetos com Modules;
const router = express.Router();

//Rotas para Registro de Usuários
router.get('/registerUser', registerControllers.getAllUsers);
router.post('/registerUser', validationMiddlewares.validateBody, registerControllers.createRegisterUser);
router.delete('/registerUser/:id', registerControllers.deleteUser);

//Rota Login
router.post('/login', validationMiddlewares.validateBodyLogin, loginController, (req, res) => {
    const registrar_id = req.user.id;
    res.status(200).json({message: 'Usuário Logado! ', registrar_id: registrar_id});
});

//Rotas para Obras
router.post('/obras', validationMiddlewares.validateBodyObras, loginController,obrasControllers.createObras);
router.get('/obras/findById',  validationMiddlewares.validateBodyLogin, loginController, obrasControllers.getObrasById);
router.put('/obrasUpdate/:id', validationMiddlewares.validateBodyObras, loginController, obrasControllers.updateObras);
router.delete('/obras/:id',  validationMiddlewares.validateBodyLogin,loginController, obrasControllers.deleteObras);


//Exportando o objeto router
module.exports = router;