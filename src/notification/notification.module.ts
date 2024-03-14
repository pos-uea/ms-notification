import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { ProxyRMQModule } from 'src/common/proxyrmq/client-proxy';
import { NotificationService } from './notification.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationSchema } from './interfaces/notification.schema';

@Module({
  imports: [
    ProxyRMQModule,
    MongooseModule.forFeature([{ name: 'Notification', schema: NotificationSchema }]),
  ],
  providers: [NotificationService],
  controllers: [NotificationController]
})
export class NotificationModule {}
