import Router from '@koa/router';
import { Context } from 'koa';
import Ajv from 'ajv';
import { StatusCodes } from 'http-status-codes';

import { deleteRecipeById } from '../../../../domain/theMealDbService';
import { deleteRecipeSchema } from '../schemas/deleteRecipe';

const router = new Router();
const ajv = new Ajv({ allErrors: true });

/**
 * @openapi
 * /api/v1/recipe/{recipeId}:
 *   delete:
 *     summary: Delete a recipe by id
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric id of the recipe to delete
 *         example: 1
 *     responses:
 *       200:
 *         description: Recipe successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
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
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: object
 */
router.delete('/recipe/:recipeId', async (ctx: Context) => {
  const validate = ajv.compile(deleteRecipeSchema);

  if (!validate(ctx.params)) {
    ctx.body = {
      success: false,
      error: [{
        msg: 'recipeId must be a string'
      }]
    };
    ctx.status = StatusCodes.BAD_REQUEST;
    return;
  }

  try {
    const recipeId = parseInt(ctx.params.recipeId);

    await deleteRecipeById(recipeId);
    ctx.status = StatusCodes.OK;
    ctx.body = { success: true };
  } catch (error) {
    ctx.status = StatusCodes.INTERNAL_SERVER_ERROR;
    ctx.body = { success: false, error };
  }
});

export default router;
