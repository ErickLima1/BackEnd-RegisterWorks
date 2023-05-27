//Importando connection ;
const connection  = require('./connection');
const bcrypt = require('bcryptjs');

//Pegando todos usuarios (teste)
const getAll = async () => {
    const [registrar] = await connection.execute('SELECT * FROM registrar');

    return registrar;

};
//Cadastrando um Usuario
const createRegister = async (registra, res) => {
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
        return res.status(500).json({ message: 'Erro interno no servidor!' });
    }
    
};

//Verificando Se existe um Email cadastrado
const checkEmailExisting = async(email, res) => {
    
    try {
        const query = 'SELECT * FROM registrar WHERE email = ?';
        const [emailExist] = await connection.execute(query, [email]);
    
        return emailExist.length > 0;

    } catch(error) {
        // return error.status(500).json({message: 'Erro interno no Servidor!'});
        return res.status(500).json({ message: 'Erro interno no servidor!' });
    }
};

//Verificando Se existe um nome cadastrado
const checkNomeExisting = async(nome, res) => {
    try{
        const query = 'SELECT * FROM registrar WHERE nome = ? ';
        const [nomeExist] = await connection.execute(query, [nome]);

        return nomeExist.length > 0;

    }catch(error) {
        return res.status(500).json({message: 'Erro Interno no Servidro'});

    }

};

//Deletando Usuario;
const deleteUser = async (id, res) => {
    try{
        const [removedUsers] = await connection.execute('DELETE FROM registrar WHERE id = ?', [id]);    
        return removedUsers;

    }catch(error) {
        return res.status(500).json({message: 'Erro Interno no Servidro'});
    }
    
};

//Exportando para usar em outros lugares/
module.exports = {
    getAll,
    createRegister,
    checkEmailExisting,
    deleteUser,
    checkNomeExisting,

};