import 'module-alias/register';

import { configureServer } from './config/server';
import { APP_PORT } from './config/environment';

const run = async () => {
  const app = await configureServer();

  app.listen({ port: APP_PORT });
  console.log(`🚀 Server ready at http://localhost:${APP_PORT}`);
};

run();
