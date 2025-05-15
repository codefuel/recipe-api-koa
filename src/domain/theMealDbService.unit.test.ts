import {
  lookupRecipeByName,
  lookupRecipeByFristLetter,
  lookupRecipeById,
  lookupRandomRecipe,
  deleteRecipeById,
} from './theMealDbService';

import { ApiError } from '../commands/apiError';
import * as theMealDb from '../infrastructure/apis/theMealDb';

jest.mock('../infrastructure/apis/theMealDb');

describe('theMealDbService', () => {
  const mockGetRecipeByName = theMealDb.getRecipeByName as jest.Mock;
  const mockGetRecipeByFirstLetter = theMealDb.getRecipeByFirstLetter as jest.Mock;
  const mockGetRecipeById = theMealDb.getRecipeById as jest.Mock;
  const mockGetRandomRecipe = theMealDb.getRandomRecipe as jest.Mock;
  const mockDeleteRecipe = theMealDb.deleteRecipe as jest.Mock;

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('lookupRecipeByName', () => {
    it('returns meals on success', async () => {
      mockGetRecipeByName.mockResolvedValue({ data: { meals: ['Meal1', 'Meal2'] } });
      const meals = await lookupRecipeByName('pasta');
      expect(mockGetRecipeByName).toHaveBeenCalledWith('pasta');
      expect(meals).toEqual(['Meal1', 'Meal2']);
    });

    it('does not throw on ApiError', async () => {
      mockGetRecipeByName.mockRejectedValue(new ApiError('not found'));
      const result = await lookupRecipeByName('unknown');
      expect(result).toBeUndefined();
    });

    it('throws on unknown error', async () => {
      mockGetRecipeByName.mockRejectedValue(new Error('fail'));
      await expect(lookupRecipeByName('fail')).rejects.toThrow();
    });
  });

  describe('lookupRecipeByFristLetter', () => {
    it('returns data on success', async () => {
      mockGetRecipeByFirstLetter.mockResolvedValue({ data: { meals: ['A'] } });
      const result = await lookupRecipeByFristLetter('a');
      expect(mockGetRecipeByFirstLetter).toHaveBeenCalledWith('a');
      expect(result).toEqual(['A']);
    });

    it('does not throw on ApiError', async () => {
      mockGetRecipeByFirstLetter.mockRejectedValue(new ApiError('bad letter'));
      const result = await lookupRecipeByFristLetter('!');
      expect(result).toBeUndefined();
    });

    it('throws on unknown error', async () => {
      mockGetRecipeByFirstLetter.mockRejectedValue(new Error('fail'));
      await expect(lookupRecipeByFristLetter('x')).rejects.toThrow();
    });
  });

  describe('lookupRecipeById', () => {
    it('returns data on success', async () => {
      mockGetRecipeById.mockResolvedValue({ data: { meals: ['Meal42'] } });
      const result = await lookupRecipeById(42);
      expect(mockGetRecipeById).toHaveBeenCalledWith(42);
      expect(result).toEqual(['Meal42']);
    });

    it('does not throw on ApiError', async () => {
      mockGetRecipeById.mockRejectedValue(new ApiError('not found'));
      const result = await lookupRecipeById(99);
      expect(result).toBeUndefined();
    });

    it('throws on unknown error', async () => {
      mockGetRecipeById.mockRejectedValue(new Error('fail'));
      await expect(lookupRecipeById(1)).rejects.toThrow();
    });
  });

  describe('lookupRandomRecipe', () => {
    it('returns data on success', async () => {
      mockGetRandomRecipe.mockResolvedValue({ data: { meals: ['RandomMeal'] } });
      const result = await lookupRandomRecipe();
      expect(mockGetRandomRecipe).toHaveBeenCalled();
      expect(result).toEqual(['RandomMeal']);
    });

    it('does not throw on ApiError', async () => {
      mockGetRandomRecipe.mockRejectedValue(new ApiError('unavailable'));
      const result = await lookupRandomRecipe();
      expect(result).toBeUndefined();
    });

    it('throws on unknown error', async () => {
      mockGetRandomRecipe.mockRejectedValue(new Error('fail'));
      await expect(lookupRandomRecipe()).rejects.toThrow();
    });
  });

  describe('deleteRecipeById', () => {
    it('calls deleteRecipe with correct ID and returns result', async () => {
      mockDeleteRecipe.mockResolvedValue({ success: true });
      const result = await deleteRecipeById(123);
      expect(mockDeleteRecipe).toHaveBeenCalledWith(123);
      expect(result?.success).toBe(true);
    });

    it('does not throw on ApiError', async () => {
      mockDeleteRecipe.mockRejectedValue(new ApiError('cannot delete'));
      const result = await deleteRecipeById(123);
      expect(result).toBeUndefined();
    });

    it('throws on unknown error', async () => {
      mockDeleteRecipe.mockRejectedValue(new Error('fail'));
      await expect(deleteRecipeById(123)).rejects.toThrow();
    });
  });
});