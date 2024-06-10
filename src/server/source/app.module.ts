import { Module } from "@nestjs/common";

import { ConfigModule } from "./config/config.module";
import { ResponseInventoryModule } from "./model/response-inventory/response-inventory.module";

@Module({
    imports: [ConfigModule, ResponseInventoryModule],
})
export class AppModule {}
