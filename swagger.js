const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
      title: 'Dog Adoption API',
      description: 'List of fictional dogs available for adoption.',
    },
    host: 'dog-adoption.onrender.com',
    schemes: ['https'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc)