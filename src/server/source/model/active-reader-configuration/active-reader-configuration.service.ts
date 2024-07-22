import { Injectable } from "@nestjs/common";

import { PrismaService } from "./../../provider/prisma.service";

import { DetailedService } from "./../../global/detailed.service";

import {
    ActiveReaderConfigurationModel,
    ActiveReaderConfigurationCreateDTO,
    ActiveReaderConfigurationUpdateDTO,
} from "./active-reader-configuration";

interface ActiveReaderConfigurationServiceInterface {}

@Injectable()
export class ActiveReaderConfigurationService
    extends DetailedService<
        ActiveReaderConfigurationModel,
        ActiveReaderConfigurationCreateDTO,
        ActiveReaderConfigurationUpdateDTO
    >
    implements ActiveReaderConfigurationServiceInterface
{
    constructor(prismaService: PrismaService) {
        super(ActiveReaderConfigurationService.name, prismaService.activeReaderConfiguration, {
            readerConfiguration: { include: { frequencyConfiguration: true } },
        });
    }
}
