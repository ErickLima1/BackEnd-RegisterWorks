//Importando models
const obrasModels = require('../models/obrasModels');

const getObrasById = async(req, res) => {
    try{
        const userId = req.user.id;
        const obras = await obrasModels.getObrasById(userId);
        console.log(obras);

        return res.status(200).json(obras);

    }catch(error) {
        return res.status(500).json({message: 'Erro interno do servidor!'});
        
    }
};

const createObras = async(req, res) => {
    try {
        const createObras = await obrasModels.createObras(req.body);

        return res.status(201).json(createObras);

    }catch(error) {
        console.log(error);
        return res.status(500).json({message: 'Erro interno do servidor!'});
    }
};

const deleteObras = async(req, res) => {
    try {
        const { id } = req.params;
        await obrasModels.deleteObras(id);
        
        console.log(id + ' Deletando Obra');
        return res.status(200).json();

    } catch(error) {
        return res.status(500).json({message: 'Erro interno do servidor!'});
    }
};
//falta testar
const updateObras = async(req, res) => {
    try {
        const { id } = req.params;
        await obrasModels.updateObras(id,req.body);

    }catch(error) {
        return res.status(500).json({ message: 'Erro interno do servidor!'});
    }
}; 

//Importando Objetos
module.exports = {
    getObrasById,
    createObras,
    deleteObras,
    updateObras,

};