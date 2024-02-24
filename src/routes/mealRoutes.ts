import { FastifyInstance } from 'fastify';
import { CreateMealController } from '../modules/meals/useCase/createMeal/createMealController';
import { GetAllMealsController } from '../modules/meals/useCase/getAllMeals/getAllMealsController';
import { checkSessionIdExists } from '../infra/middlewares/check-session-id-exists';



export async function mealRoutes(app: FastifyInstance) {
  const createUseController = new CreateMealController();
  const getAllUsersController = new GetAllMealsController();

  app.post('/', createUseController.handle);
  app.get('/', { preHandler: checkSessionIdExists }, getAllUsersController.handle);
}
