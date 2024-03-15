import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';

const logger = new Logger('Main');

const user = process.env.RMQ_USER
const password = encodeURIComponent(process.env.RMQ_PASSWORD)
const host = process.env.RMQ_URL
const protocol = process.env.RMQ_PROTOCOLO

async function bootstrap() {

  console.log(`${protocol}://${user}:${password}@${host}`);

  const app = await NestFactory.createMicroservice(AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [`${protocol}://${user}:${password}@${host}`],
        noAck: false,
        queue: 'notifications'
      },}
    );  
  
  
  await app.listen().then(() => {
    Logger.log('Microservice is listening',process.env.NODE_ENV,process.env.RMQ_URL);
  }).catch((error) => {
    Logger.error('Microservice is not listening', error);
  });
}
bootstrap();
