import cookies from '@fastify/cookie';
import fastify from 'fastify';
import { userRoutes } from './routes/userRoutes';
import { env } from './infra/env';

const app = fastify();

app.register(cookies);

app.register(userRoutes, { prefix: 'users' });

app.listen({ port: env.PORT }).then(() => {
  console.log(`Server listening on port ${env.PORT}`);
});
