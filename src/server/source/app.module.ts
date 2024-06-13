import { Module } from "@nestjs/common";

import { ConfigModule } from "./config/config.module";
import { SocketGateway } from "./provider/socket.gateway";

import { AttemptModule } from "./model/attempt/attempt.module";
import { FrequencyModule } from "./model/frequency/frequency.module";

@Module({
    imports: [ConfigModule, AttemptModule, FrequencyModule],
    providers: [SocketGateway],
})
export class AppModule {}
