import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { EditMealByIdUseCase } from './editMealByIdUseCase';
import { knex } from '../../../../database';

export class EditMealByIdController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const mealIdParamsSchema = z.object({
      mealId: z.string().uuid(),
    });

    const { mealId } = mealIdParamsSchema.parse(request.params);

    const editMealBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      isOnDiet: z.boolean(),
      date: z.coerce.date(),
    });

    const { name, description, isOnDiet, date } = editMealBodySchema.parse(
      request.body
    );

    const meal = await knex('meals').where({ id: mealId }).first();

    if (!meal) {
      reply.status(404).send({ error: 'Meal not found' });
    }

    const editMealByIdUseCase = new EditMealByIdUseCase();

    await editMealByIdUseCase.execute({
      name,
      description,
      isOnDiet,
      date,
      mealId,
    });

    return reply.status(204).send();
  }
}
