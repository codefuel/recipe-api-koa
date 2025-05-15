import axios from 'axios';
import config from '../../commands/getConfig';
import { ApiError } from '../../commands/apiError';

const api = config.theMealDb.api;

export const getRecipeByName = async (name: string) => {
  try {
    return await axios.get(`${api}/search.php?s=${name}`);
  } catch (error) {
    throw new ApiError("Failed to get recipe");
  }
};

export const getRecipeByFirstLetter = async (letter: string) => {
  try {
    return await axios.get(`${api}/search.php?f=${letter}`);
  } catch (error) {
    throw new ApiError("Failed to get recipe");
  }
};

export const getRecipeById = async (recipeId: number) => {
  try {
    return await axios.get(`${api}/lookup.php?i=${recipeId}`);
  } catch (error) {
    throw new ApiError("Failed to get recipe");
  }
};

export const getRandomRecipe = async () => {
  try {
    return await axios.get(`${api}/random.php`);
  } catch (error) {
    throw new ApiError("Failed to get recipe");
  }
};

export const deleteRecipe = async (recipeId: number) => {
  try {
    await axios.delete("");
    return {success: true, message: 'Stubbed delete recipe response'};
  } catch (error) {
    throw new ApiError("Failed to delete recipe");
  }
};
