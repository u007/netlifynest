import { bootstrap } from './bootstrap.nest';
import type { NestConfig } from 'src/common/configs/config.interface';
import { ConfigService } from '@nestjs/config';

async function startServer() {
  const app = await bootstrap();
  console.log('starting server');
  const configService = app.get(ConfigService);
  const nestConfig = configService.get<NestConfig>('nest');
  await app.listen(nestConfig.port);
}

startServer();
