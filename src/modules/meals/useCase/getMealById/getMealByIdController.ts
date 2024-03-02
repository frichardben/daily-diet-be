import { FastifyReply, FastifyRequest } from 'fastify';
import { GetMealByIdUseCase } from './getMealByIdUseCase';
import { z } from 'zod';

export class GetMealByIdController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const mealIdParamsSchema = z.object({
      mealId: z.string().uuid(),
    });

    const { mealId } = mealIdParamsSchema.parse(request.params);

    const getMealByIdUseCase = new GetMealByIdUseCase();

    const meal = await getMealByIdUseCase.execute(mealId);

    if (!meal) {
      reply.status(404).send({ error: 'Meal not found' });
    }

    return reply.status(200).send(meal);
  }
}
