import Router from '@koa/router';
import { Context } from 'koa';
import Ajv from 'ajv';
import { StatusCodes } from 'http-status-codes';

import { lookupRandomRecipe, lookupRecipeById, lookupRecipeByFristLetter, lookupRecipeByName } from '../../../../domain/theMealDbService';
import { getRecipeByNameSchema, getRecipeByIdSchema } from '../schemas/getRecipe';

const router = new Router();
const ajv = new Ajv({ allErrors: true });

/**
 * @openapi
 * /api/v1/recipe:
 *   get:
 *     summary: Get recipes by name
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the recipe to search for
 *     responses:
 *       200:
 *         description: Successfully retrieved recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 meals:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Missing or invalid query parameter
 */
router.get('/recipe', async (ctx: Context) => {
  const validate = ajv.compile(getRecipeByNameSchema);

  if (!validate({ name: ctx.query.name })) {
    ctx.body = {
      success: false,
      errors: validate.errors
    };
    ctx.status = StatusCodes.BAD_REQUEST;
    return;
  }

  try {
    const name = ctx.query.name as string;

    let meals: any[] = [];

    if (name.length === 1) {
      meals = [await lookupRecipeByFristLetter(name)];
    } else {
      meals = await lookupRecipeByName(name);
    }
    ctx.status = StatusCodes.OK;
    ctx.body = {success: true, meals};
  } catch (error) {
    ctx.status = StatusCodes.INTERNAL_SERVER_ERROR;
    ctx.body = {success: false, error};
  }
});

/**
 * @openapi
 * /api/v1/recipe/random:
 *   get:
 *     summary: Get a random recipe
 *     responses:
 *       200:
 *         description: Successfully retrieved random recipe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 meals:
 *                   type: array
 *                   items:
 *                     type: object
 */
router.get('/recipe/random', async (ctx: Context) => {
  try {
    const meals = await lookupRandomRecipe();
    ctx.status = StatusCodes.OK;
    ctx.body = { success: true, meals };
  } catch (error) {
    ctx.status = StatusCodes.INTERNAL_SERVER_ERROR;
    ctx.body = { success: false, error: 'Failed to get random recipe' };
  }
});

/**
 * @openapi
 * /api/v1/recipe/{recipeId}:
 *   get:
 *     summary: Get recipe by id
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric Id of the recipe to retrieve
 *         example: 52819
 *     responses:
 *       200:
 *         description: Successfully retrieved recipe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 meals:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Invalid recipeId parameter
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                         example: recipeId must be a number
 */
router.get('/recipe/:recipeId', async (ctx: Context) => {
  const validate = ajv.compile(getRecipeByIdSchema);

  if (!validate(ctx.params)) {
    ctx.body = {
      success: false,
      errors: validate.errors
    };
    ctx.status = StatusCodes.BAD_REQUEST;
    return;
  }

  try {
    const recipeId = parseInt(ctx.params.recipeId);

    const meals = await lookupRecipeById(recipeId);

    ctx.status = StatusCodes.OK;
    ctx.body = {success: true, meals};
  } catch (error) {
    ctx.status = StatusCodes.INTERNAL_SERVER_ERROR;
    ctx.body = {success: false, error};
  }
});

export default router;
