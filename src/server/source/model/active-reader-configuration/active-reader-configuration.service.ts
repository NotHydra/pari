import { Injectable, InternalServerErrorException } from "@nestjs/common";

import { PrismaDetailedModelInterface } from "./../../common/interface/prisma-model.interface";

import { PrismaService } from "./../../provider/prisma.service";

import { DetailedService } from "./../../global/detailed.service";

import {
    ActiveReaderConfigurationModel,
    ActiveReaderConfigurationCreateDTO,
    ActiveReaderConfigurationUpdateDTO,
    ActiveReaderConfigurationDetailedModel,
    ActiveReaderConfigurationRawModel,
} from "./active-reader-configuration";

import { FrequencyConfigurationModel } from "./../frequency-configuration/frequency-configuration";

interface ActiveReaderConfigurationServiceInterface {
    findConfiguration(): Promise<ActiveReaderConfigurationRawModel>;
}

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

    public async findConfiguration(): Promise<ActiveReaderConfigurationRawModel> {
        try {
            this.loggerService.log("Find Configuration");

            const model: ActiveReaderConfigurationDetailedModel = await this.prismaModel.findFirst({
                include: this.detailed,
            });

            const rawModel: ActiveReaderConfigurationRawModel = {
                id: model.readerConfiguration.id,
                name: model.readerConfiguration.name,
                rssiScanCount: model.readerConfiguration.rssiScanCount,
                rssiScanInterval: model.readerConfiguration.rssiScanInterval,
                frequencyConfiguration: model.readerConfiguration.frequencyConfiguration.map(
                    (frequencyConfiguration: FrequencyConfigurationModel): string => {
                        return frequencyConfiguration.frequency;
                    }
                ),
            };

            this.loggerService.debug(`Find Configuration Result: ${JSON.stringify(rawModel)}`);

            return rawModel;
        } catch (error) {
            this.loggerService.error(`Find Configuration: ${error.message}`);

            throw new InternalServerErrorException("Internal Server Error");
        }
    }
}
