import { Module } from "@nestjs/common";

import { ConfigModule } from "./config/config.module";
import { SocketGateway } from "./provider/socket.gateway";

import { AttemptModule } from "./model/attempt/attempt.module";
import { FrequencyModule } from "./model/frequency/frequency.module";
import { RSSIModule } from "./model/rssi/rssi.module";

@Module({
    imports: [ConfigModule, AttemptModule, FrequencyModule, RSSIModule],
    providers: [SocketGateway],
})
export class AppModule {}
