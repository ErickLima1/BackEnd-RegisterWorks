//Carregando Modulo
const mysql = require('mysql2/promise');
require('dotenv').config();

//Banco de dados LOcal
// console.log(process.env.MYSQL_HOST);
// console.log(process.env.MYSQL_USER);
// console.log(process.env.MYSQL_PASSWORD);
// console.log(process.env.MYSQL_DB);

//Criando Objeto com MOdules
// const connection = mysql.createPool({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DB
// });

//Adicionando o banco de dados Online
const connection = mysql.createPool(process.env.DATABASE_URL);
console.log('Connected to Railway!');

//Export module = connection
module.exports = connection;