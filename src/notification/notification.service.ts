import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { ClientProxyRadioFrequency } from 'src/common/proxyrmq/proxyrmq.module';
import HTML_NOTIFICACAO from 'src/common/static/html-notificacao';

@Injectable()
export class NotificationService {

    constructor(
        private clientProxyRadioFrequency: ClientProxyRadioFrequency,
        private readonly mailService: MailerService
    ) { }

    private readonly logger = new Logger(NotificationService.name)

    private dominioNotifications = this.clientProxyRadioFrequency.getClientProxyDominioNotificationInstance();
    private dominioSensor = this.clientProxyRadioFrequency.getClientProxyDominioSensorsInstance();

    async sendNotification(notification: any): Promise<void> {

        //get information notification sensor
        const sensor: any = await this.dominioSensor.send('get-notification-admin-by-sensor-id', notification.sensor).toPromise();

        if (!sensor) {
            this.logger.error(`sensor not found: ${JSON.stringify(notification)}`)
            return;
        }

        //check data
        this.logger.log(`sensor notification: ${JSON.stringify(sensor)}`)
     
        const sensorName   = notification.sensor_code;
        const emails       = sensor.emails;
        const valor_limite = sensor.value_limite;
        const valor_informado = notification.value;
        let regra = sensor.type;

        this.logger.log(`Data MAIL`,sensorName, emails, valor_limite, valor_informado, regra);


        if (sensor.type === 'MENOR_IGUAL' && notification.value <= sensor.value_limite ) {
            
            regra = 'Menor Igual';
            this.logger.log(`try email`,regra);
            this.sendEmail(sensorName, valor_limite, valor_informado, regra, emails);
        }else if (sensor.type === 'MAIOR_IGUAL' && notification.value >= sensor.value_limite ) {
            
            regra = 'Maior Igual';
            this.logger.log(`try email`,regra);
            this.sendEmail(sensorName, valor_limite, valor_informado, regra, emails);
        }else if (sensor.type === 'IGUAL' && notification.value === sensor.value_limite ) {
            
            regra = 'Igual';
            this.logger.log(`try email`,regra);
            this.sendEmail(sensorName, valor_limite, valor_informado, regra, emails);

        }else if (sensor.type ===  'MENOR' && notification.value < sensor.value_limite ) {
            regra = 'Menor';
            this.logger.log(`try email`,regra);
            this.sendEmail(sensorName, valor_limite, valor_informado, regra, emails);
        }else if (sensor.type ===  'MAIOR' && notification.value > sensor.value_limite ) {
            regra = 'Maior';
            this.logger.log(`try email`,regra);
            this.sendEmail(sensorName, valor_limite, valor_informado, regra, emails);
        }

    }

    sendEmail(nomeSensor:string, valorLimite:number, valorInfomado:number, regra:string, emails:string[]) {
        this.logger.log(`Starting email... into`);
        let markup = ''
    
        markup = HTML_NOTIFICACAO
        markup = markup.replace(/#NOME_SENSOR/g, nomeSensor)
        markup = markup.replace(/#VALORLIMITE/g, valorLimite.toString())    
        markup = markup.replace(/#VALORINFORMARDO/g, valorInfomado.toString())
        markup = markup.replace(/#REGRA/g, regra)
    
        this.mailService.sendMail({
            to: emails,
            from: `"SMRF" <noreply.pos.uea@gmail.com>`,
            subject: 'Notificação de Sensor',
            html: markup,
        })
            .then((success) => {
                this.logger.log(success)
            })
            .catch((err) => {
                this.logger.error(err)
            })
    }
    




}
