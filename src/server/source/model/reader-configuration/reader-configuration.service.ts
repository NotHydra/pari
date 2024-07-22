import { Injectable } from "@nestjs/common";

import { PrismaService } from "./../../provider/prisma.service";

import { DetailedService } from "./../../global/detailed.service";

import {
    ReaderConfigurationModel,
    ReaderConfigurationCreateDTO,
    ReaderConfigurationUpdateDTO,
} from "./reader-configuration";

interface ReaderConfigurationServiceInterface {}

@Injectable()
export class ReaderConfigurationService
    extends DetailedService<ReaderConfigurationModel, ReaderConfigurationCreateDTO, ReaderConfigurationUpdateDTO>
    implements ReaderConfigurationServiceInterface
{
    constructor(prismaService: PrismaService) {
        super(ReaderConfigurationService.name, prismaService.readerConfiguration, {
            frequencyConfiguration: true,
        });
    }
}
