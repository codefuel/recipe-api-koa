import axios from 'axios';
import { getRecipeByName, getRecipeByFirstLetter, getRecipeById, getRandomRecipe, deleteRecipe } from './theMealDb';
import { ApiError } from '../../commands/apiError';
import config from '../../commands/getConfig';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('theMealDb API', () => {
  const api = config.theMealDb.api;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getRecipeByName', () => {
    it('should successfully get recipe by name', async () => {
      const mockResponse = { data: { meals: [] } };
      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await getRecipeByName('Chicken');

      expect(mockedAxios.get).toHaveBeenCalledWith(`${api}/search.php?s=Chicken`);
      expect(result).toBe(mockResponse);
    });

    it('should throw ApiError when request fails', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error());

      await expect(getRecipeByName('Chicken'))
        .rejects
        .toThrow(new ApiError('Failed to get recipe'));
    });
  });

  describe('getRecipeByFirstLetter', () => {
    it('should successfully get recipe by first letter', async () => {
      const mockResponse = { data: { meals: [] } };
      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await getRecipeByFirstLetter('C');

      expect(mockedAxios.get).toHaveBeenCalledWith(`${api}/search.php?f=C`);
      expect(result).toBe(mockResponse);
    });

    it('should throw ApiError when request fails', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error());

      await expect(getRecipeByFirstLetter('C'))
        .rejects
        .toThrow(new ApiError('Failed to get recipe'));
    });
  });

  describe('getRecipeById', () => {
    it('should successfully get recipe by id', async () => {
      const mockResponse = { data: { meals: [] } };
      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await getRecipeById(12345);

      expect(mockedAxios.get).toHaveBeenCalledWith(`${api}/lookup.php?i=12345`);
      expect(result).toBe(mockResponse);
    });

    it('should throw ApiError when request fails', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error());

      await expect(getRecipeById(12345))
        .rejects
        .toThrow(new ApiError('Failed to get recipe'));
    });
  });

  describe('getRandomRecipe', () => {
    it('should successfully get random recipe', async () => {
      const mockResponse = { data: { meals: [] } };
      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await getRandomRecipe();

      expect(mockedAxios.get).toHaveBeenCalledWith(`${api}/random.php`);
      expect(result).toBe(mockResponse);
    });

    it('should throw ApiError when request fails', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error());

      await expect(getRandomRecipe())
        .rejects
        .toThrow(new ApiError('Failed to get recipe'));
    });
  });

  describe('deleteRecipe', () => {
    it('should return stubbed success response', async () => {
      mockedAxios.delete.mockResolvedValueOnce({});

      const result = await deleteRecipe(12345);

      expect(mockedAxios.delete).toHaveBeenCalledWith("");
      expect(result).toEqual({
        success: true,
        message: 'Stubbed delete recipe response'
      });
    });

    it('should throw ApiError when request fails', async () => {
      mockedAxios.delete.mockRejectedValueOnce(new Error('Network error'));

      await expect(deleteRecipe(12345))
        .rejects
        .toThrow(new ApiError('Failed to delete recipe'));
    });
  });
});

