import Koa from 'koa';
import Router from '@koa/router';
import bodyParser from 'koa-bodyparser';
import { koaSwagger } from 'koa2-swagger-ui';
import swaggerJsDoc from 'swagger-jsdoc';

import { router as v1Router } from './presentation/http/v1';

const app = new Koa();
const router = new Router();
const port = 3000;

// Swagger setup
const swaggerSpec = swaggerJsDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Recipe API',
      version: '1.0.0',
    },
  },
  apis: ['./src/presentation/http/*/routes/*.ts'],
});

// Middleware
app.use(bodyParser());

// Swagger UI
router.get('/api-docs', koaSwagger({
  routePrefix: false,
  swaggerOptions: {
    spec: swaggerSpec,
    url: '/api-docs/swagger.json'
  } as Record<string, unknown>
}));

// Routes
router.use('/api/v1', v1Router.routes(), v1Router.allowedMethods());

// Register router
app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
