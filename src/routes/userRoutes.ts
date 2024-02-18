import { FastifyInstance } from 'fastify';

import { CreateUserController } from '../modules/users/useCase/createUser/createUserController';
import { GetAllUsersController } from '../modules/users/useCase/getAllUsers/getAllUsersController';

export async function userRoutes(app: FastifyInstance) {
  const createUseController = new CreateUserController();
  const getAllUsersController = new GetAllUsersController();

  app.post('/', createUseController.handle);
  app.get('/', getAllUsersController.handle);
}
