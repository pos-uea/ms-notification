import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { ProxyRMQModule } from 'src/common/proxyrmq/client-proxy';
import { NotificationService } from './notification.service';

@Module({
  imports: [ProxyRMQModule],
  providers: [NotificationService],
  controllers: [NotificationController]
})
export class NotificationModule {}
