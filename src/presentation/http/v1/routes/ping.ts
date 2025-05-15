import Router from '@koa/router';
import { Context } from 'koa';
import { StatusCodes } from 'http-status-codes';

const pingRouter = new Router();

/**
 * @openapi
 * /api/v1/ping:
 *   get:
 *     summary: Health check endpoint
 *     responses:
 *       200:
 *         description: Server is alive
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "pong"
 */
pingRouter.get('/ping', async (ctx: Context) => {
  ctx.status = StatusCodes.OK;
  ctx.body = { message: 'pong' };
});

export default pingRouter;
