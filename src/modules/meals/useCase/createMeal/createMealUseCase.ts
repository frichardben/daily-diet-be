import { randomUUID } from 'crypto';
import { knex } from '../../../../database';

interface ICreateMeal {
  name: string;
  description: string;
  isOnDiet: boolean;
  date: Date;
  userId: string;
}

export class CreateMealUseCase {
  async execute({ name, description, isOnDiet, date, userId }: ICreateMeal) {
    const meal = await knex('meals').insert({
      id: randomUUID(),
      name,
      description,
      is_on_diet: isOnDiet,
      date: date.getTime(),
      user_id: userId,
    });

    return meal;
  }
}
