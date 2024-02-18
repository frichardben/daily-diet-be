import { knex } from '../../../../database';
import { randomUUID } from 'node:crypto';

export interface ICreateUSer {
  name: string;
  email: string;
  sessionId: string;
}

export class CreateUserUseCase {
  async execute({ name, email, sessionId }: ICreateUSer) {

    const userAlreadyExist = await knex('users').where({ email }).first();

    if (userAlreadyExist) {
      throw new Error('User already exists');
    }

    const user = await knex('users').insert({
      id: randomUUID(),
      name,
      email,
      session_id: sessionId,
    });

    return user;
  }
}
