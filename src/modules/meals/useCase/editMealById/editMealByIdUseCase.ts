import { knex } from '../../../../database';

interface IEditMealByUseCase {
  name: string;
  description: string;
  isOnDiet: boolean;
  date: Date;
  mealId: string;
}

export class EditMealByIdUseCase {
  async execute({
    name,
    description,
    isOnDiet,
    date,
    mealId,
  }: IEditMealByUseCase) {
    const meal = await knex('meals')
      .where({ id: mealId, })
      .update({
        name,
        description,
        is_on_diet: isOnDiet,
        date: date.getTime(),
      });

    return meal;
  }
}
