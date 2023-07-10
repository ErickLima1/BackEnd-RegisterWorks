//Pegando apenas a function checkEmail
const {checkEmailExisting, checkNomeExisting} = require('../models/registerModels');

//importando yup
const yup = require('yup');

// Validando erros para passa pra rotas.

//Validação para campo Obras usando YUP
const validateObrasSchema = yup.object().shape({
    obras: yup.string().required('Campo Obras em Branco!'),
    email:  yup.string().required('Campo E-mail em Branco! '),
    senha: yup.string().required('Campo Senha em Branco!'),
    registrar_id: yup.number().required('Campo Id em Branco!'),
    
});

//Validação para campo validateBody
const ValidateBodySchema = yup.object().shape({
    nome:  yup.string().required('Campo Nome em Branco! '),
    email: yup.string().required('Campo E-mail em Branco!'),
    senha: yup.string().required('Campo Senha em Branco!'),  

});

//Validação para campo validateBodyLogin
const validateLogin = yup.object().shape({
    email: yup.string().test('empty-email', 'Campo E-mail em Branco!', value => value !== ''),
    senha: yup.string().test('empty-senha', 'Campo Senha em Branco!', value => value !== ''),
});



const validateBody = async(req, res, next) => {
    const { body } = req;

    try {

        await ValidateBodySchema.validate(body, {abortEarly: false});

        const emailExist = await checkEmailExisting(body.email);
        const nomeExist = await checkNomeExisting(body.nome, res);

        if(emailExist) {
            throw new Error('Email Já Cadastrado!');
        }
        
        if(nomeExist) {
            throw new Error('Nome Já em Uso!');
        }

        next();
         
    }catch(error) {
        return res.status(400).json({message: error.message });
    }

};

const validateBodyObras = async(req, res, next) => {
    const { body } = req;

    try {
        await validateObrasSchema.validate(body, {abortEarly: false});

        next();

    }catch(error) {
        return res.status(400).json({ message: error.message });
    }
};

const validateBodyLogin = async(req, res, next) => {
    const { body } = req;

    try{
        await validateLogin.validate(body, {abortEarly: false});
        next();
        
    }catch(error) {
        return res.status(400).json({ message: error.message});
    }
};

module.exports = {
    validateBody,
    validateBodyObras,
    validateBodyLogin,
};