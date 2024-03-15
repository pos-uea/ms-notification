import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NotificationModule } from './notification/notification.module';
import { ProxyRMQModule } from './common/proxyrmq/client-proxy';
import { MailerModule } from '@nestjs-modules/mailer';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationSchema } from './notification/interfaces/notification.schema';

const password = encodeURIComponent("Jujutsu@2024");

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'production' ? '.env.production':'.env.development',
      isGlobal: true
    }),
    
    MongooseModule.forRoot(`mongodb+srv://salomaocalheiros:${password}@cluster0.qpzlosd.mongodb.net/notifications?retryWrites=true&w=majority`),
    MongooseModule.forFeature([{ name: 'Notification', schema: NotificationSchema }]),

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
