import { JSONSchemaType } from 'ajv';

export interface PutRecipeSchema {
  name: string;
  ingredients: string[];
  instructions: string;
}

export const putRecipeSchema: JSONSchemaType<PutRecipeSchema> = {
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