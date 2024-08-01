import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Swagger definition
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'Your API Documentation',
      version: '1.0.0',
      description: 'Documentation for your API',
    },
    servers: [
      {
        url: 'http://localhost:8800',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Post: {
          type: 'object',
          required: ['title', 'desc', 'username'],
          properties: {
            id: {
              type: 'string',
              description: 'The auto-generated id of the post',
            },
            title: {
              type: 'string',
              description: 'The title of the post',
            },
            desc: {
              type: 'string',
              description: 'The description of the post',
            },
            username: {
              type: 'string',
              description: 'The username of the author',
            },
            img: {
              type: 'string',
              description: 'The image URL of the post',
            },
            date: {
              type: 'string',
              format: 'date-time',
              description: 'The date the post was created',
            },
          },
        },
      },
    },
  };
  

// Options for the swagger docs
const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // Path to your API routes
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

export const swaggerDocs = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
