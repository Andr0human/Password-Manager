import swaggerJsdoc from 'swagger-jsdoc';

const options: any = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API documentation for Password-Manager app',
    },
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
        },
      },
    },
    security: [
      {
        ApiKeyAuth: [],
      },
    ],
  },
  apis: ['src/**/*.ts'],
};

const swaggerSpec: any = swaggerJsdoc(options);

export default swaggerSpec;
