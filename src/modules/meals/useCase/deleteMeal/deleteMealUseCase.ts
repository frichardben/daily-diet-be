import { knex } from '../../../../database';

export class DeleteUseCase {
  async execute(mealId: string) {
    const findMeal = await knex('meals').where({ id: mealId }).first();

    if (!findMeal) {
      return console.error('Meal not founds');
    }

    const meal = await knex('meals').where({ id: mealId }).del();

    return meal;
  }
}
