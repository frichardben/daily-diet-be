import { knex } from '../../../../database';

export class GetAllUserUseCase {
  async execute(sessionId) {
    const users = await knex('users').where('session_id', sessionId).select();

    return { users };
  }
}
