import { FastifyInstance } from 'fastify';

import { CreateUserController } from '../modules/users/useCase/createUser/createUserController';
import { GetAllUsersController } from '../modules/users/useCase/getAllUsers/getAllUsersController';
import { checkSessionIdExists } from '../infra/middlewares/check-session-id-exists';

export async function userRoutes(app: FastifyInstance) {
  const createUseController = new CreateUserController();
  const getAllUsersController = new GetAllUsersController();

  app.post('/', createUseController.handle);
  app.get('/', { preHandler: checkSessionIdExists }, getAllUsersController.handle);
}
