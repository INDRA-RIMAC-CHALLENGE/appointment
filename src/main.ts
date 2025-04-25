import { initApplication } from './app';
import { envConfig } from './infraestructure/config/main.config';

async function bootstrap() {
  const [app] = await initApplication();

  await app.listen(envConfig.NODE_PORT);
}
bootstrap();
