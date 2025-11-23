import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CRUD API",
      description: "API documentation for CRUD application",
    },
    host: "localhost:3001",
    components: {
      schemas: {
        Member: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "674b01a812939f0c63a11234",
            },
            name: {
              type: "string",
              example: "John Doe",
            },
            email: {
              type: "string",
              example: "john@gmail.com",
            },
          },
        },

        Project: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "674c92be12939f0c63a44555",
            },
            name: {
              type: "string",
              example: "Project Management System",
            },
            description: {
              type: "string",
              example: "This is a project description",
            },
            owner: {
              type: "string",
              example: "674b01a812939f0c63a11234",
            },
            members: {
              type: "array",
              items: {
                type: "string",
                example: "674b03f812939f0c63a11567",
              },
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};
const swaggerSpec = swaggerJsdoc(options);

export const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
