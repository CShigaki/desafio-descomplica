import 'module-alias/register';

import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';

import AuthRoutes from 'routes/auth';
import SeedRoutes from 'routes/seed';
import { schema } from '../src/schema';
import { NODE_ENV } from './environment';

export const configureServer = async (): Promise<express.Express> => {
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

  return app;
};
