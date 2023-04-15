import swaggerAutogen from 'swagger-autogen';
import dotenv from 'dotenv';
dotenv.config();

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/app.ts'];
const doc = {
    info: {
        title: process.env.PROJECT_NAME,
        description: process.env.PROJECT_DESCRIPTION,
    },
    host: 'localhost:3000',
    basePath: '/',
    schemes: ['http', 'https'],
    securityDefinitions: {
        bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT'
        }
    },
    // security: [{ bearerAuth: [] }],
};

swaggerAutogen({openapi: '3.0.0'})(outputFile, endpointsFiles, doc);