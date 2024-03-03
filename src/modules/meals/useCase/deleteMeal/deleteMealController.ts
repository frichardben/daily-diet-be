import { FastifyReply, FastifyRequest } from 'fastify';
import { DeleteUseCase } from './deleteMealUseCase';
import { z } from 'zod';

export class DeleteMealController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const mealIdParamsSchema = z.object({
      mealId: z.string(),
    });

    const { mealId } = mealIdParamsSchema.parse(request.params);

    const deleteMealUseCase = new DeleteUseCase();

    const meal = await deleteMealUseCase.execute(mealId);

    if (!meal) {
      reply.status(404).send({ error: 'Meal not found' });
    }

    return reply.status(204).send();
  }
}
