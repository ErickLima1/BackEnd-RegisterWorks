//Importando connection ;
const connection  = require('./connection');
const bcrypt = require('bcryptjs');

//Pegando todos usuarios cadastrado do banco.
const getAllUsers = async () => {
    const [result] = await connection.execute('SELECT * FROM registrar');

    return result;

};

//Cadastrando um Usuario
const createRegisterUser = async (registra) => {
    try {
        const {nome, email, senha} = registra;
        const dataUTC = new Date(Date.now()).toUTCString();
    
        //Cryptografar a senha
        const salt = await bcrypt.genSalt(10);
        const senhaCriptografada = await bcrypt.hash(senha, salt);
    
        const query = 'INSERT INTO registrar(nome, email, senha, created_at) VALUES (?, ?, ?, ?)';
    
        const [createdUsuarios] = await connection.execute(query, [nome, email, senhaCriptografada, dataUTC]);
    
        return  {insertId: createdUsuarios.insertId};

    }catch(error) {
        throw new Error('Erro interno no banco!');
    }
    
};

//Verifica a existencia do registros com o email fornecido..
const checkEmailExisting = async(email) => {
    try {
        const query = 'SELECT * FROM registrar WHERE email = ?';
        const [emailExist] = await connection.execute(query, [email]);
    
        return emailExist.length > 0;

    } catch(error) {
        // return error.status(500).json({message: 'Erro interno no Servidor!'});
        throw new Error('Erro interno no banco!');
    }
};

//Verificando Se existe um nome cadastrado
const checkNomeExisting = async(nome) => {
    try{
        const query = 'SELECT * FROM registrar WHERE nome = ? ';
        const [nomeExist] = await connection.execute(query, [nome]);

        return nomeExist.length > 0;

    }catch(error) {
        throw new Error('Erro interno no banco!');

    }

};

const findByIdUser = async (id) => {
    try {
        const query = 'SELECT * FROM registrar WHERE id = ?';
        const [byId] = await connection.execute(query, [id]);
        const user = byId[0];
        
        return user;
        
    }catch(error) {
        throw new Error('Erro interno no banco!');
    }
};

//Deletando Usuario;
const deleteUser = async (id) => {
    try{
        const [removedUsers] = await connection.execute('DELETE FROM registrar WHERE id = ?', [id]); 

        return removedUsers;

    }catch(error) {
        throw new Error('Erro interno no banco!');
    }
    
};

//Exportando para usar em outros lugares/
module.exports = {
    getAllUsers,
    createRegisterUser,
    checkEmailExisting,
    findByIdUser,
    deleteUser,
    checkNomeExisting,
};