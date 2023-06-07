//Pegando apenas a function checkEmail
const {checkEmailExisting, checkNomeExisting} = require('../models/registerModels');

// Validando erros para passa pra rotas.

const validateField = (field, errorMenssagem)  => {
    if(field === undefined || field === '' || field === null) {
        throw new Error(errorMenssagem);
    }
};

const validateBody = async(req, res, next) => {
    const { body } = req;

    try {
        validateField(body.nome, 'Campo nome em Branco!');
        validateField(body.email, 'Campo E-mail em Branco!');

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
        validateField(body.obras, 'Campo Obras em Branco!');

        next();

    }catch(error) {
        return res.status(400).json({ message: error.message });
    }
};

const validateBodyLogin = async(req, res, next) => {
    const { body } = req;

    try{
        validateField(body.email, 'Campo Email em Branco!');
        validateField(body.senha, 'Campo Senha em Branco!');
        
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