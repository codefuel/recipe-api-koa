import { JSONSchemaType } from 'ajv';

export interface PostRecipeSchema {
  name: string;
  ingredients: string[];
  instructions: string;
}

export const postRecipeSchema: JSONSchemaType<PostRecipeSchema> = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    ingredients: {
      type: 'array',
      items: { type: 'string' }
    },
    instructions: { type: 'string' }
  },
  required: ['name', 'ingredients', 'instructions'],
  additionalProperties: false
}; 