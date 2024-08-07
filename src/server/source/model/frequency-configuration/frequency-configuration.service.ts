import { Injectable, InternalServerErrorException } from "@nestjs/common";

import { PrismaModelInterface } from "./../../common/interface/prisma-model.interface";

import { PrismaService } from "./../../provider/prisma.service";

import { BaseService } from "./../../global/base.service";

import {
    FrequencyConfigurationModel,
    FrequencyConfigurationCreateDTO,
    FrequencyConfigurationUpdateDTO,
} from "./frequency-configuration";

interface FrequencyConfigurationServiceInterface {
    findReaderConfigurationId(
        readerConfigurationId: number,
        page: number,
        count: number
    ): Promise<FrequencyConfigurationModel[]>;
}

@Injectable()
export class FrequencyConfigurationService
    extends BaseService<FrequencyConfigurationModel, FrequencyConfigurationCreateDTO, FrequencyConfigurationUpdateDTO>
    implements FrequencyConfigurationServiceInterface
{
    constructor(prismaService: PrismaService) {
        super(
            FrequencyConfigurationService.name,
            prismaService.frequencyConfiguration as unknown as PrismaModelInterface<FrequencyConfigurationModel>
        );
    }

    public async findReaderConfigurationId(
        readerConfigurationId: number,
        page: number = 0,
        count: number = 0
    ): Promise<FrequencyConfigurationModel[]> {
        try {
            this.loggerService.log("Find Reader Configuration Id");
            this.loggerService.debug(
                `Find Reader Configuration Id Argument: ${JSON.stringify({ readerConfigurationId, page, count })}`
            );

            const models: FrequencyConfigurationModel[] =
                page !== 0 && count !== 0
                    ? await this.prismaModel.findMany({
                          where: { readerConfigurationId },
                          skip: (page - 1) * count,
                          take: count,
                          orderBy: {
                              id: "asc",
                          },
                      })
                    : await this.prismaModel.findMany({
                          where: { readerConfigurationId },
                          orderBy: {
                              id: "asc",
                          },
                      });

            this.loggerService.debug(`Find Reader Configuration Id Result: ${JSON.stringify(models)}`);

            return models;
        } catch (error) {
            this.loggerService.error(`Find Reader Configuration Id: ${error.message}`);

            throw new InternalServerErrorException("Internal Server Error");
        }
    }
}
