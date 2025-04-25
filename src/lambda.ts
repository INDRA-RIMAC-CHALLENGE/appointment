import { configure } from '@codegenie/serverless-express';
import { initApplication } from './app';

let cachedServer;

const bootstrapServer = async () => {
  if (!cachedServer) {
    const [, expressApp] = await initApplication();
    cachedServer = configure({ app: expressApp });
  }
  return cachedServer;
};

export const handler = async (event, context, callback) => {
  const server = await bootstrapServer();
  return server(event, context, callback);
};
