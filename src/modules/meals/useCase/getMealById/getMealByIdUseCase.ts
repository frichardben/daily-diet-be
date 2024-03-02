import { knex } from '../../../../database';

export class GetMealByIdUseCase {
  async execute(mealId: string) {
    const meal = await knex('meals').where({ id: mealId }).first();

    return meal;
  }
}
