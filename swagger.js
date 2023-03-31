const swaggerAutogen = require('swagger-autogen')({
    openapi: 'Enable',       
    autoHeaders: true,     
    autoQuery: true,     
    autoBody: true      
});
const doc = {
    info: {
      title: 'My API',
      description: 'Description',
    },
    host: 'localhost:4000',
    schemes: ['http'],
};
const outputFile = './swagger.json';
const endPointFiles = ['./app.js'];
swaggerAutogen(outputFile,endPointFiles,doc);