import { Module } from "@nestjs/common";

import { PrismaService } from "./../../provider/prisma.service";

import { ReaderConfigurationController } from "./reader-configuration.controller";
import { ReaderConfigurationService } from "./reader-configuration.service";

@Module({
    controllers: [ReaderConfigurationController],
    providers: [PrismaService, ReaderConfigurationService],
})
export class ReaderConfigurationModule {}
