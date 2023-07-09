//Importando Modules
const app = require('./app');
require('dotenv').config();

const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
    console.log(`Server Rodando na Port ${PORT}`);
});