import { Module } from '@nestjs/common';
import { ClientProxyRadioFrequency } from './proxyrmq.module';

@Module({
    providers: [ClientProxyRadioFrequency],
    exports: [ClientProxyRadioFrequency]
})
export class ProxyRMQModule {}
