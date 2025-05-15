import { Context, Next } from 'koa';
import Ajv, { JSONSchemaType } from 'ajv';
import { StatusCodes } from 'http-status-codes';

const ajv = new Ajv();

export interface ValidationOptions {
  body?: boolean;
  query?: boolean;
  params?: boolean;
}

export function validate<T>(schema: JSONSchemaType<T>, options: ValidationOptions = { body: true }) {
  const validator = ajv.compile(schema);

  return async (ctx: Context, next: Next) => {
    let data = {} as Record<string, unknown>;

    if (options.body) {
      data = { ...data, ...(ctx.request.body as Record<string, unknown>) };
    }
    if (options.query) {
      data = { ...data, ...(ctx.query as Record<string, unknown>) };
    }
    if (options.params) {
      data = { ...data, ...(ctx.params as Record<string, unknown>) };
    }

    const valid = validator(data);

    if (!valid) {
      ctx.status = StatusCodes.BAD_REQUEST;
      ctx.body = {
        success: false,
        errors: validator.errors
      };
      return;
    }

    await next();
  };
}