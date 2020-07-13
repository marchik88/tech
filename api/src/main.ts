import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import * as helmet from 'helmet';
// import * as csurf from 'csurf';
import * as fastifyRateLimit from 'fastify-rate-limit';
import * as fastifyCompress from 'fastify-compress';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
    {
      // 'log', 'error', 'warn', 'debug'
      logger: ['error', 'warn'],
    },
  );
  app.use(helmet());
  app.enableCors();
  app.register(fastifyCompress, { global: false });
  // app.use(csurf());
  // app.register(fastifyRateLimit, {
  //   max: 25,
  //   timeWindow: '1 minute',
  // });
  await app.listen(8989, '0.0.0.0');
}
bootstrap();
