import { FastifyReply, FastifyRequest } from 'fastify';
import { DeleteUseCase } from './deleteMealUseCase';
import { z } from 'zod';
import { knex } from '../../../../database';

export class DeleteMealController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const mealIdParamsSchema = z.object({
      mealId: z.string(),
    });

    const { mealId } = mealIdParamsSchema.parse(request.params);

    const meal = await knex('meals').where({ id: mealId }).first();

    if (!meal) {
      reply.status(404).send({ error: 'Meal not found' });
    }

    const deleteMealUseCase = new DeleteUseCase();

    await deleteMealUseCase.execute(mealId);

    return reply.status(204).send();
  }
}
