import Koa from 'koa';
import Router from '@koa/router';
import bodyParser from 'koa-bodyparser';
import { koaSwagger } from 'koa2-swagger-ui';
import swaggerJsDoc from 'swagger-jsdoc';

import { router as v1Router } from './presentation/http/v1';
import pingRouter from './presentation/http/v1/routes/ping';

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
    spec: swaggerSpec as Record<string, unknown>,
    url: '/api-docs/swagger.json'
  }
}));

// Routes
router.use(pingRouter.routes(), pingRouter.allowedMethods());
router.use('/api/v1', v1Router.routes(), v1Router.allowedMethods());

// Register router
app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
