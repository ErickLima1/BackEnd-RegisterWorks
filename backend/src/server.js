//Importando Modules
const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
    console.log(`Server Rodando na Port ${PORT}`);
});