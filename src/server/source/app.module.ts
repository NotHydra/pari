import { Module } from "@nestjs/common";

import { ConfigModule } from "./config/config.module";
import { SocketGateway } from "./provider/socket.gateway";

import { ReaderConfigurationModule } from "./model/reader-configuration/reader-configuration.module";
import { FrequencyConfigurationModule } from "./model/frequency-configuration/frequency-configuration.module";
import { TagModule } from "./model/tag/tag.module";
import { FrequencyModule } from "./model/frequency/frequency.module";
import { RSSIModule } from "./model/rssi/rssi.module";

@Module({
    imports: [
        ConfigModule,
        ReaderConfigurationModule,
        FrequencyConfigurationModule,
        TagModule,
        FrequencyModule,
        RSSIModule,
    ],
    providers: [SocketGateway],
})
export class AppModule {}
