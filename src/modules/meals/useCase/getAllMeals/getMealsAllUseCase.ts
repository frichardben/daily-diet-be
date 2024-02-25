import { knex } from '../../../../database';

export class GetMealsAllUseCase {
  async execute(sessionId) {
    const meals = await knex('meals')
      .where({ user_id: sessionId })
      .orderBy('date', 'desc');

    return {
      meals,
    };
  }
}
