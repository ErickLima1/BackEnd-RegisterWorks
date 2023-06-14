//Importando connection
const connection = require('./connection');

//Obter Obras cadastrada pelo usuario. 
const getObrasById = async(id) => {
    try{
        const query = 'SELECT * FROM obras where registrar_id = ?';
        const [byId] = await connection.execute(query, [id]);
        
        return byId;

    }catch(error){
        throw new Error('Erro ao obter as obras do usúario.');
    }

};

const obrasStatus = Object.freeze({
    Pendente: 'Pendente'

});

//cadastro de obras do usuario registrar_id 	
const createObras = async(obra) => {
    try{
        const {obras, capitulos, registrar_id} = obra;
        const status = obrasStatus.Pendente;

        const query = 'INSERT INTO obras (obras, capitulos, status, registrar_id) VALUES (?, ?, ? , ?)';
        const [createObras] = await connection.execute(query, [obras, capitulos, status, registrar_id]);
        
        return {insertId: createObras.insertId};

    }catch(error) {
        throw new Error('Erro ao cadastrar obras.');
    }
};

//deletar Obras
const deleteObras = async(id) => {
    try{
        const [removedObras] = await connection.execute('DELETE FROM obras WHERE obras.id = ?',[id]);

        return removedObras;

    }catch(error) {
        throw new Error('Erro ao Deletar');
    }
};

const updateObras = async(id, obra) => {
    try {
        const {obras, capitulos, status} = obra;

        const query = 'UPDATE obras SET obras = ?, capitulos = ?, status = ? WHERE obras.id = ?';
        const [updatedObras] = await connection.execute(query, [obras, capitulos, status, id]);

        return updatedObras;

    } catch(error) {
        console.log(error);
        throw new Error('Erro ao atualizar');
    }
};


//Importando Objetos
module.exports = {
    getObrasById,
    createObras,
    deleteObras,
    updateObras,
};