import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateUserUseCase } from './createUserUseCase';
import { z } from 'zod';
import { randomUUID } from 'crypto';

export interface ICreateUSer {
  name: string;
  email: string;
}

export class CreateUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const createUserBodySchema = z.object({
      name: z.string(), 
      email: z.string(),
    });

    let sessionId = request.cookies.sessionId;

    if (!sessionId) {
      sessionId = randomUUID();

      reply.setCookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      });
    }

    const { name, email } = createUserBodySchema.parse(request.body);



    const createUserCase = new CreateUserUseCase();

    await createUserCase.execute({
      name,
      email,
      sessionId
    });

    return reply.status(201).send();
  }
}
