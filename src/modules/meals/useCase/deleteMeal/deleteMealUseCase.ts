import { knex } from '../../../../database';

export class DeleteUseCase {
  async execute(mealId: string) {
    const meal = await knex('meals').where({ id: mealId }).del();

    return meal;
  }
}
