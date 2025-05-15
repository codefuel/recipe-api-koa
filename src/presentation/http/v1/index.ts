import Router from '@koa/router';
import type { RouterContext } from '@koa/router';
import deleteRecipeRouter from './routes/deleteRecipe';
import getRecipeRouter from './routes/getRecipe';
import postRecipeRouter from './routes/postRecipe';
import putRecipeRouter from './routes/putRecipe';

const router = new Router<RouterContext>();

// Mount all routes
[deleteRecipeRouter, getRecipeRouter, postRecipeRouter, putRecipeRouter].forEach(subRouter => {
  router.use(subRouter.routes());
  router.use(subRouter.allowedMethods());
});

export { router };
