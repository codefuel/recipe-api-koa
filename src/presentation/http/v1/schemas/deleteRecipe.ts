import { JSONSchemaType } from 'ajv';

export interface DeleteRecipe {
  recipeId: string;
}

export const deleteRecipeSchema: JSONSchemaType<DeleteRecipe> = {
  type: 'object',
  properties: {
    recipeId: {
      type: 'string',
      pattern: '^[0-9]+$'
    }
  },
  required: ['recipeId'],
  additionalProperties: false
};
