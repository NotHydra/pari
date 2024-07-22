import { Module } from "@nestjs/common";

import { PrismaService } from "./../../provider/prisma.service";

import { ActiveReaderConfigurationController } from "./active-reader-configuration.controller";
import { ActiveReaderConfigurationService } from "./active-reader-configuration.service";

@Module({
    controllers: [ActiveReaderConfigurationController],
    providers: [PrismaService, ActiveReaderConfigurationService],
})
export class ActiveReaderConfigurationModule {}
