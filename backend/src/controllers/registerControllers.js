//Importando os controllers
const registerModel = require('../models/registerModels');


const getAllUsers = async (req, res) => {
    try {
        const result = await registerModel.getAllUsers(); 

        return res.status(200).json(result);

    }catch(error) {
        return res.status(500).json({message: 'Erro Interno no Servidor!'});
    }
};

const createRegisterUser = async (req, res) => {
    try {
        const createdUser = await registerModel.createRegisterUser(req.body);

        return res.status(201).json(createdUser);
        
    }catch(error) {
        return res.status(500).json({message: 'Erro Interno no Servidor!'});
    }
};

const deleteUser = async(req, res) => {
    try {
        const {id} = req.params;
        await registerModel.deleteUser(id);
        console.log(id);

        return res.status(204).json();


    }catch(error) {
        return res.status(500).json({message: 'Erro Interno do Servidor!'});
    }
};

//Importando Objetos
module.exports = {
    getAllUsers,
    createRegisterUser,
    deleteUser,
};