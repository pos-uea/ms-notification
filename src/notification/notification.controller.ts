import { Controller, Logger } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

const ackErrors: string[] = ['E11000']

@Controller('notification')
export class NotificationController {

    constructor(
        private readonly appService: NotificationService
    ) { }

    private readonly logger = new Logger(NotificationController.name)

    @EventPattern('create-notification')
    async sendNotification(
        @Payload() notification: any,
        @Ctx() context: RmqContext
    ) {
        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();
        this.logger.log(`notification: ${JSON.stringify(notification)}`)

        try {
            await this.appService.sendNotification(notification)
            await channel.ack(originalMsg)
        } catch (error) {
            this.logger.log(`error: ${JSON.stringify(error.message)}`)
            const filterAckError = ackErrors.filter(
                ackError => error.message.includes(ackError))
            if (filterAckError.length > 0) {
                await channel.ack(originalMsg)
            }
        }
    }



}
