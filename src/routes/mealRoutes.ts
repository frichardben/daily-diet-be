import { FastifyInstance } from 'fastify';
import { CreateMealController } from '../modules/meals/useCase/createMeal/createMealController';
import { GetMealsAllController } from '../modules/meals/useCase/getAllMeals/getMealsAllController';
import { checkSessionIdExists } from '../infra/middlewares/check-session-id-exists';
import { EditMealByIdController } from '../modules/meals/useCase/editMealById/editMealByIdController';
import { GetMealByIdController } from '../modules/meals/useCase/getMealById/getMealByIdController';

export async function mealRoutes(app: FastifyInstance) {
  const createUseController = new CreateMealController();
  const getAllUsersController = new GetMealsAllController();
  const editMealByIdController = new EditMealByIdController();
  const getMealByIdController = new GetMealByIdController();

  app.post('/', createUseController.handle);
  app.get(
    '/',
    { preHandler: checkSessionIdExists },
    getAllUsersController.handle
  );
  app.get(
    '/:mealId',
    { preHandler: checkSessionIdExists },
    getMealByIdController.handle
  );
  app.put(
    '/:mealId',
    { preHandler: checkSessionIdExists },
    editMealByIdController.handle
  );
}
