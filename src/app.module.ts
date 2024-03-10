import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NotificationService } from './notification/notification.service';
import { NotificationModule } from './notification/notification.module';
import { ProxyRMQModule } from './common/proxyrmq/client-proxy';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'production' ? '.env.production':'.env.development',
      isGlobal: true
    }),
    MailerModule.forRoot({
      transport: {
        host: 'email-smtp.sa-east-1.amazonaws.com',
        port: 587,
        secure: false,
        tls: {
          ciphers: 'SSLv3'
        },
        auth: {
          user: 'AKIAT3GA6RDWJ43MZKXC',
          pass: 'BOZ2FtZA/XJ7NeMhKIQbp1tc5KN9eJ+lPpgA90PbF5+M'
        }
      }
    }),
    ProxyRMQModule,
    NotificationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
