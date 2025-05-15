import Router from '@koa/router';
import { Context } from 'koa';
import Ajv from 'ajv';
import { StatusCodes } from 'http-status-codes';

import { postRecipeSchema } from '../schemas/postRecipe';

const router = new Router();

const ajv = new Ajv({ allErrors: true });

/**
 * @openapi
 * /api/v1/recipe:
 *   post:
 *     summary: Create a new recipe
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the recipe
 *                 example: "Tap Water"
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of ingredients
 *                 example: ["1 glass", "1 cup water"]
 *               instructions:
 *                 type: string
 *                 description: Cooking instructions
 *                 example: "Do the thing!"
 *     responses:
 *       200:
 *         description: Recipe successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   example: "OK"
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
router.post('/recipe', async (ctx: Context) => {
  const validate = ajv.compile(postRecipeSchema);

  if (!validate(ctx.request.body)) {
    ctx.body = {
      success: false,
      error: validate.errors
    };

    ctx.status = StatusCodes.BAD_REQUEST;
    return;
  }

  try {
    const { name, ingredients, instructions } = ctx.request.body;

    ctx.status = StatusCodes.OK;
    // TODO stubbed response
    ctx.body = {success: "OK"};
  } catch (error) {
    ctx.status = StatusCodes.INTERNAL_SERVER_ERROR;
    ctx.body = { success: false, error };
  }
});

export default router;
