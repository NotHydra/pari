import { Module } from "@nestjs/common";

import { PrismaService } from "./../../provider/prisma.service";

import { FrequencyConfigurationController } from "./frequency-configuration.controller";
import { FrequencyConfigurationService } from "./frequency-configuration.service";

@Module({
    controllers: [FrequencyConfigurationController],
    providers: [PrismaService, FrequencyConfigurationService],
})
export class FrequencyConfigurationModule {}
