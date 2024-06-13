import { Module } from "@nestjs/common";

import { ConfigModule } from "./config/config.module";
import { SocketGateway } from "./provider/socket.gateway";

import { AttemptModule } from "./model/attempt/attempt.module";

@Module({
    imports: [ConfigModule, AttemptModule],
    providers: [SocketGateway],
})
export class AppModule {}
