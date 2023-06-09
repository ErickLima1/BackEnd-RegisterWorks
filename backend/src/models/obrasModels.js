//Importando connection
const connection = require('./connection');

//obter as obras do usuário pelo ID.
const getObrasById = async(id) => {
    try{
        const query = 'SELECT * FROM obras where registrar_id = ?';
        const [byId] = await connection.execute(query, [id]);
        
        return byId;

    }catch(error){
        throw new Error('Erro ao obter as obras do usúario.');
    }

};

//cadastro de obras registrar_id 	
const createObras = async(obra) => {
    try{
        const {obras, capitulos, registrar_id} = obra;
        const query = 'INSERT INTO obras (obras, capitulos, status, registrar_id) VALUES (?, ?, ? , ?)';
        const [createObras] = await connection.execute(query, [obras, capitulos, 'Pendente', registrar_id]);
        
        return {insertId: createObras.insertId};

    }catch(error) {
        throw new Error('Erro ao cadastrar obras.');
    }
};

//deletar Obras
const deleteObras = async(id) => {
    try{
        const [removedObras] = await connection.execute('DELETE FROM obras WHERE obras.id = ?',[id]);
        console.log(removedObras);
        console.log('Obra deletada');

        return removedObras;

    }catch(error) {
        throw new Error('Erro ao Deletar');
    }
};
//falta testar
const updateObras = async(id, res) => {
    try {
        const query = 'UPDATE obras SET = ?, capitulos = ?, status = ? WHERE obras.id = ?';
        const [updatedObras] = await connection.execute(query, [id]);

        return updatedObras;

    } catch(error) {
        return res.status(500).json({message: 'Erro Interno no Servidro'});
    }
};


//Importando Objetos
module.exports = {
    getObrasById,
    createObras,
    deleteObras,
    updateObras,
};