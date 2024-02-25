import { FastifyReply, FastifyRequest } from 'fastify';
import { GetMealByIdUseCase } from './getMealByIdUseCase';
import { z } from 'zod';

export class GetMealByIdController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const mealIdParamsSchema = z.object({
      mealId: z.string().uuid(),
    });

    const { mealId } = mealIdParamsSchema.parse(request.params);

    if (!mealId) {
      reply.status(404).send({ error: 'Meal not found' });
    }

    const getMealByIdUseCase = new GetMealByIdUseCase();

    const result = await getMealByIdUseCase.execute(mealId);

    return reply.status(200).send(result);
  }
}
