import cookies from '@fastify/cookie';
import fastify from 'fastify';
import { userRoutes } from './routes/userRoutes';
import { env } from './infra/env';
import { mealRoutes } from './routes/mealRoutes';

export const app = fastify();

app.register(cookies);

app.register(userRoutes, { prefix: 'users' });
app.register(mealRoutes, { prefix: 'meals' });

app.listen({ port: env.PORT }).then(() => {
  console.log(`Server listening on port ${env.PORT}`);
});
