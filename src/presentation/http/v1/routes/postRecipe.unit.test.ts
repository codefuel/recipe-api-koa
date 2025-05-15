import request from 'supertest';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { StatusCodes } from 'http-status-codes';

import postRecipeRouter from './postRecipe';

describe('POST /recipe', () => {
  let app: Koa;

  beforeEach(() => {
    app = new Koa();
    app.use(bodyParser());
    app.use(postRecipeRouter.routes());
  });

  it('should return 200 OK with success message', async () => {
    const response = await request(app.callback())
      .post('/recipe')
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
