import { FastifyReply, FastifyRequest } from 'fastify';
import { GetMealsAllUseCase } from './getMealsAllUseCase';

export class GetMealsAllController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const getAllMealsUseCase = new GetMealsAllUseCase();

    const { sessionId } = request.cookies;

    const result = await getAllMealsUseCase.execute(sessionId);

    reply.status(200).send(result);
  }
}
