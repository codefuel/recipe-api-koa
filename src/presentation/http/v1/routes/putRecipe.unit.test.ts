import request from 'supertest';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { StatusCodes } from 'http-status-codes';

import putRecipeRouter from './putRecipe';

const recipeId = 1;

describe('PUT /recipe', () => {
  let app: Koa;

  beforeEach(() => {
    app = new Koa();
    app.use(bodyParser());
    app.use(putRecipeRouter.routes());
  });

  it('should return 200 OK with success message', async () => {
    const response = await request(app.callback())
      .put(`/recipe/${recipeId}`)
      .send({
        name: 'Test Recipe',
        ingredients: ['Ingredient 1', 'Ingredient 2'],
        instructions: 'Test Instructions'
      });

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body).toEqual({
      success: 'OK'
    });
  });
});
