import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { CreateMealUseCase } from './createMealUseCase';

export class CreateMealController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const createMealBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      isOnDiet: z.boolean(),
      date: z.coerce.date(),
    });

    const { name, description, isOnDiet, date } = createMealBodySchema.parse(
      request.body
    );
    
    const { sessionId } = request.cookies;

    const createMealUSeCase = new CreateMealUseCase();

    await createMealUSeCase.execute({
      name,
      description,
      isOnDiet,
      date,
      userId: sessionId,
    });

    return reply.status(201).send();
  }
}
