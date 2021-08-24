import 'module-alias/register';

import express from 'express';
import { ApolloServer } from 'apollo-server-express';
// import cors from 'cors';

import { schema } from './src/schema';
import { APP_PORT } from './config/environment';
import AuthRoutes from 'routes/auth';

const run = async () => {
  const server = new ApolloServer({
    schema,
  });
  await server.start();

  const app = express();
  // app.use(cors({
  //   origin: 'localhost:3000',
  //   credentials: false,
  // }));
  app.use(AuthRoutes);

  server.applyMiddleware({ app, path: '/data' });

  await app.listen({ port: APP_PORT });
  console.log(`🚀 Server ready at http://localhost:${APP_PORT}${server.graphqlPath}`);
};

run();
