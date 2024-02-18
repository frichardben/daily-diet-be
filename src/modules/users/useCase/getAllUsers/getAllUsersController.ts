import { FastifyRequest, FastifyReply } from 'fastify';
import { GetAllUserUseCase } from './getAllUserUseCase';

export interface IUSer {
  sessionId: string;
}

export class GetAllUsersController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { sessionId } = request.cookies;
    const getAllUSersUseCase = new GetAllUserUseCase();

    const result = await getAllUSersUseCase.execute(sessionId);

    return reply.status(200).send(result);
  }
}
