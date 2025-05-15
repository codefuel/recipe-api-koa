import request from 'supertest';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { StatusCodes } from 'http-status-codes';

import deleteRecipeRouter from './deleteRecipe';
import * as mealDbService from '../../../../domain/theMealDbService';

jest.mock('../../../../domain/theMealDbService');

describe('DELETE /recipe/:recipeId', () => {
  let app: Koa;

  beforeEach(() => {
    app = new Koa();
    app.use(bodyParser());
    app.use(deleteRecipeRouter.routes());
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return 200 and success: true when deletion succeeds', async () => {
    const mockDelete = mealDbService.deleteRecipeById as jest.Mock;
    mockDelete.mockResolvedValue(undefined);
    const response = await request(app.callback()).delete('/recipe/123');

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body).toEqual({ success: true });
    expect(mockDelete).toHaveBeenCalledWith(123);
  });

  it('should return 400 if recipeId is not numeric', async () => {
    const response = await request(app.callback()).delete('/recipe/notANumber');

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body.success).toBe(false);
    expect(response.body.error[0].msg).toBe('recipeId must be a string');
  });

  it('should return 500 if deleteRecipeById throws', async () => {
    const mockDelete = mealDbService.deleteRecipeById as jest.Mock;
    mockDelete.mockRejectedValue(new Error('DB error'));

    const response = await request(app.callback()).delete('/recipe/999');

    expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
  });
});
