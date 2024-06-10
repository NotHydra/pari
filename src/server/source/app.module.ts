import { Module } from "@nestjs/common";

import { ConfigModule } from "./config/config.module";
import { ResponseInventoryModule } from "./model/response-inventory/response-inventory.module";
import { SocketGateway } from "./provider/socket.gateway";

@Module({
    imports: [ConfigModule, ResponseInventoryModule],
    providers: [SocketGateway],
})
export class AppModule {}
