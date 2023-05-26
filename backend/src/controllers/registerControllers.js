//Importando os controllers
const registerModel = require('../models/registerModels');


const getAll = async (req, res) => {
    try {
        const register = await registerModel.getAll(); 
        return res.status(200).json(register);

    }catch(error) {
        return res.status(500).json({message: 'Erro Interno no Servidor!'});
    }
};

const createRegister = async (req, res) => {
    try {
        const createdUser = await registerModel.createRegister(req.body);
        return res.status(201).json(createdUser);
        
    }catch(error) {
        return res.status(500).json({message: 'Erro Interno no Servidor!'});
    }
};

const deleteUser = async(req, res) => {
    try {
        const {id} = req.params;
        await registerModel.deleteUser(id);
        return res.status(204).json();


    }catch(error) {
        return res.status(500).json({message: 'Erro Interno do Servidor!'});
    }
};


//Importando Objetos
module.exports = {
    getAll,
    createRegister,
    deleteUser,
};