import { JSONSchemaType } from 'ajv';

export const getRecipeByNameSchema: JSONSchemaType<{ name: string }> = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 1
    }
  },
  required: ['name'],
  additionalProperties: false
};

export const getRecipeByIdSchema: JSONSchemaType<{ recipeId: string }> = {
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

