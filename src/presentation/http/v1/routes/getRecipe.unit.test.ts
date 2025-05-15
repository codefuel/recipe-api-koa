import request from 'supertest';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { StatusCodes } from 'http-status-codes';

import getRecipeRouter from './getRecipe';
import * as mealDbService from '../../../../domain/theMealDbService';

jest.mock('../../../../domain/theMealDbService');

describe('GET /recipe?name=...', () => {
  let app: Koa;

  beforeEach(() => {
    app = new Koa();
    app.use(bodyParser());
    app.use(getRecipeRouter.routes());
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return 200 and success: true when fetching succeeds', async () => {
    const mockGet = mealDbService.lookupRecipeByName as jest.Mock;
    const mockMeals = [{ id: 1, name: 'Test Meal' }];
    mockGet.mockResolvedValue(mockMeals);
    
    const response = await request(app.callback()).get('/recipe').query({ name: 'nachos' });
    
    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body).toEqual({ success: true, meals: mockMeals });
    expect(mockGet).toHaveBeenCalledWith('nachos');
  });

  it('should return 400 if the query param is missing', async () => {
    const response = await request(app.callback()).get('/recipe');

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body.success).toBe(false);
    expect(response.body.errors[0]).toMatchObject({
      keyword: 'required',
      params: { missingProperty: 'name' }
    });
  });

  it('should return 500 if lookupRecipeByName throws', async () => {
    const mockGet = mealDbService.lookupRecipeByName as jest.Mock;
    mockGet.mockRejectedValue(new Error('DB error'));

    const response = await request(app.callback()).get('/recipe').query({ name: 'nachos' });

    expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
  });
});

describe('GET /recipe/:recipeId', () => {
  let app: Koa;

  beforeEach(() => {
    app = new Koa();
    app.use(bodyParser());
    app.use(getRecipeRouter.routes());
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return 200 and success: true when fetching by ID succeeds', async () => {
    const mockGet = mealDbService.lookupRecipeById as jest.Mock;
    const mockMeals = [{ id: 123, name: 'Test Recipe' }];
    mockGet.mockResolvedValue(mockMeals);

    const response = await request(app.callback()).get('/recipe/123');

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body).toEqual({ success: true, meals: mockMeals });
    expect(mockGet).toHaveBeenCalledWith(123);
  });

  it('should return 400 if recipeId is not a number', async () => {
    const response = await request(app.callback()).get('/recipe/abc');

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body.success).toBe(false);
    expect(response.body.errors[0]).toMatchObject({
      keyword: 'pattern',
      params: { pattern: '^[0-9]+$' }
    });
  });

  it('should return 500 if lookupRecipeById throws', async () => {
    const mockGet = mealDbService.lookupRecipeById as jest.Mock;
    mockGet.mockRejectedValue(new Error('DB error'));

    const response = await request(app.callback()).get('/recipe/123');

    expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
  });
});

describe('GET /recipe/random', () => {
  let app: Koa;

  beforeEach(() => {
    app = new Koa();
    app.use(bodyParser());
    app.use(getRecipeRouter.routes());
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return 200 and success: true when fetching random recipe succeeds', async () => {
    const mockGet = mealDbService.lookupRandomRecipe as jest.Mock;
    const mockMeals = [{ id: 999, name: 'Random Recipe' }];
    mockGet.mockResolvedValue(mockMeals);

    const response = await request(app.callback()).get('/recipe/random');

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body).toEqual({ success: true, meals: mockMeals });
    expect(mockGet).toHaveBeenCalled();
  });

  it('should return 500 if lookupRandomRecipe throws', async () => {
    const mockGet = mealDbService.lookupRandomRecipe as jest.Mock;
    mockGet.mockRejectedValue(new Error('DB error'));

    const response = await request(app.callback()).get('/recipe/random');

    expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body).toEqual({
      success: false,
      error: 'Failed to get random recipe'
    });
  });
});

