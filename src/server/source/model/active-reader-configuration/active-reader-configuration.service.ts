import { Injectable } from "@nestjs/common";

import { PrismaService } from "./../../provider/prisma.service";

import { DetailedService } from "./../../global/detailed.service";

import {
    ActiveReaderConfigurationModel,
    ActiveReaderConfigurationCreateDTO,
    ActiveReaderConfigurationUpdateDTO,
    ActiveReaderConfigurationDetailedModel,
} from "./active-reader-configuration";
import { PrismaDetailedModelInterface } from "source/common/interface/prisma-model.interface";

interface ActiveReaderConfigurationServiceInterface {}

@Injectable()
export class ActiveReaderConfigurationService
    extends DetailedService<
        ActiveReaderConfigurationModel,
        ActiveReaderConfigurationDetailedModel,
        ActiveReaderConfigurationCreateDTO,
        ActiveReaderConfigurationUpdateDTO
    >
    implements ActiveReaderConfigurationServiceInterface
{
    constructor(prismaService: PrismaService) {
        super(
            ActiveReaderConfigurationService.name,
            prismaService.activeReaderConfiguration as unknown as PrismaDetailedModelInterface<
                ActiveReaderConfigurationModel,
                ActiveReaderConfigurationDetailedModel
            >,
            {
                readerConfiguration: { include: { frequencyConfiguration: true } },
            }
        );
    }
}
