import { ApiError } from '../commands/apiError';
import { deleteRecipe } from '../infrastructure/apis/theMealDb';
import {
  getRandomRecipe,
  getRecipeById,
  getRecipeByFirstLetter,
  getRecipeByName,
} from '../infrastructure/apis/theMealDb';

export const lookupRecipeByName = async (name: string) => {
  try {
    const response = await getRecipeByName(name);
    return response.data.meals;
  } catch (error) {
    if (error instanceof ApiError) {
      // log
    } else {
      throw new Error();
    }
  }
};

export const lookupRecipeByFristLetter = async (letter: string) => {
  try {
    const response = await getRecipeByFirstLetter(letter);
    return response.data.meals
  } catch (error) {
    if (error instanceof ApiError) {
      // log
    } else {
      throw new Error();
    }
  }
};

export const lookupRecipeById = async (recipeId: number) => {
  try {
    const response = await getRecipeById(recipeId);
    return response.data.meals;
  } catch (error) {
    if (error instanceof ApiError) {
      // log
    } else {
      throw new Error();
    }
  }
};

export const lookupRandomRecipe = async () => {
  try {
    const response = await getRandomRecipe();
    return response.data.meals;
  } catch (error) {
    if (error instanceof ApiError) {
      // log
    } else {
      throw new Error();
    }
  }
};

export const deleteRecipeById = async (recipeId: number) => {
  try {
    return await deleteRecipe(recipeId);
  } catch (error) {
    if (error instanceof ApiError) {
      // log
    } else {
      throw new Error();
    }
  }
};
