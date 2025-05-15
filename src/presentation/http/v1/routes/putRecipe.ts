import Router from '@koa/router';
import { Context } from 'koa';
import Ajv from 'ajv';
import { StatusCodes } from 'http-status-codes';

import { putRecipeSchema } from '../schemas/putRecipe';

const router = new Router();

const ajv = new Ajv({ allErrors: true });

/**
 * @openapi
 * /api/v1/recipe:
 *   put:
 *     summary: Update an existing recipe
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID of the recipe to update
 *                 example: 1
 *               name:
 *                 type: string
 *                 description: Updated name of the recipe
 *                 example: "Tap Water"
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Updated list of ingredients
 *                 example: ["1 glass", "1 cup water"]
 *               instructions:
 *                 type: string
 *                 description: Updated cooking instructions
 *                 example: "Do the thing!"
 *     responses:
 *       200:
 *         description: Recipe successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   example: "OK"
 *       400:
 *         description: Invalid request body
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
router.put('/recipe/:recipeId', async (ctx: Context) => {
  const validate = ajv.compile(putRecipeSchema);

  if (!validate(ctx.request.body)) {
    ctx.body = {
      success: false,
      error: validate.errors
    };

    ctx.status = StatusCodes.BAD_REQUEST;
    return;
  }

  try {
    const recipeId = ctx.params.recipeId as unknown as number;
    
    ctx.status = StatusCodes.OK;
    // TODO stubbed response
    ctx.body = {success: "OK"};
  } catch (error) {
    ctx.status = StatusCodes.INTERNAL_SERVER_ERROR;
    ctx.body = { success: false, error };
  }
});

export default router;
