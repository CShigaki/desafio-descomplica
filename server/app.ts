import 'module-alias/register';

import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';

import { schema } from './src/schema';
import { APP_PORT, NODE_ENV } from './config/environment';
import AuthRoutes from 'routes/auth';
import SeedRoutes from 'routes/seed';

const run = async () => {
  const server = new ApolloServer({
    schema,
  });
  await server.start();

  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({
    extended: true,
  }));
  app.use(cors());
  app.use(AuthRoutes);

  // The seed routes are only available in the development environment for testing purposes.
  if ('development' === NODE_ENV) {
    app.use(SeedRoutes);
  }

  server.applyMiddleware({ app, path: '/data' });

  await app.listen({ port: APP_PORT });
  console.log(`🚀 Server ready at http://localhost:${APP_PORT}${server.graphqlPath}`);
};

run();
