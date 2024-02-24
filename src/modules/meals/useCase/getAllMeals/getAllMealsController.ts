import { FastifyReply, FastifyRequest } from 'fastify';
import { GetAllMealsUseCase } from './getAllMealsUseCase';

export class GetAllMealsController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const getAllMealsUseCase = new GetAllMealsUseCase();

    const { sessionId } = request.cookies;

    const result = await getAllMealsUseCase.execute(sessionId);

    reply.status(200).send(result);
  }
}
