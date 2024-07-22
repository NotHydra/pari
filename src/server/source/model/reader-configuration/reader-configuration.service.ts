import { Injectable } from "@nestjs/common";

import { PrismaService } from "./../../provider/prisma.service";

import { DetailedService } from "./../../global/detailed.service";

import {
    ReaderConfigurationModel,
    ReaderConfigurationCreateDTO,
    ReaderConfigurationUpdateDTO,
    ReaderConfigurationDetailedModel,
} from "./reader-configuration";
import { PrismaDetailedModelInterface } from "source/common/interface/prisma-model.interface";

interface ReaderConfigurationServiceInterface {}

@Injectable()
export class ReaderConfigurationService
    extends DetailedService<
        ReaderConfigurationModel,
        ReaderConfigurationDetailedModel,
        ReaderConfigurationCreateDTO,
        ReaderConfigurationUpdateDTO
    >
    implements ReaderConfigurationServiceInterface
{
    constructor(prismaService: PrismaService) {
        super(
            ReaderConfigurationService.name,
            prismaService.readerConfiguration as unknown as PrismaDetailedModelInterface<
                ReaderConfigurationModel,
                ReaderConfigurationDetailedModel
            >,
            {
                frequencyConfiguration: true,
            }
        );
    }
}
