import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { PrismaModelInterface } from "./../../common/interface/prisma-model.interface";

import { PrismaService } from "./../../provider/prisma.service";

import { BaseService } from "./../../global/base.service";

import {
    FrequencyConfigurationModel,
    FrequencyConfigurationCreateDTO,
    FrequencyConfigurationUpdateDTO,
    FrequencyConfigurationTableModel,
    FrequencyConfigurationTableRawModel,
} from "./frequency-configuration";

interface FrequencyConfigurationServiceInterface {
    findTable(
        readerConfigurationId: number,
        count: number,
        page: number,
        sortBy: string,
        sortOrder: string
    ): Promise<FrequencyConfigurationTableModel[]>;
}

@Injectable()
export class FrequencyConfigurationService
    extends BaseService<FrequencyConfigurationModel, FrequencyConfigurationCreateDTO, FrequencyConfigurationUpdateDTO>
    implements FrequencyConfigurationServiceInterface
{
    constructor(private readonly prismaService: PrismaService) {
        super(
            FrequencyConfigurationService.name,
            prismaService.frequencyConfiguration as unknown as PrismaModelInterface<FrequencyConfigurationModel>
        );
    }

    public async findTable(
        readerConfigurationId: number,
        count: number = 0,
        page: number = 0,
        sortBy: string = "id",
        sortOrder: string = "asc"
    ): Promise<FrequencyConfigurationTableModel[]> {
        try {
            this.loggerService.log("Find Table");
            this.loggerService.debug(
                `Find Table Argument: ${JSON.stringify({ readerConfigurationId, count, page, sortBy, sortOrder })}`
            );

            const models: FrequencyConfigurationTableModel[] = (
                (await this.prismaService.$queryRaw`
                SELECT
                    frequency_configuration.id AS "id",
                    frequency_configuration.frequency AS "frequency",
                    frequency_configuration.created_at AS "created_at",
                    frequency_configuration.updated_at AS "updated_at"

                FROM
                    frequency_configuration

                WHERE
                    frequency_configuration.reader_configuration_id=${readerConfigurationId}

                ORDER BY
                    ${Prisma.sql([sortBy])} ${Prisma.sql([sortOrder === "desc" ? "desc" : "asc"])}

                ${count !== 0 ? Prisma.sql([`LIMIT ${count}`]) : Prisma.sql([""])}

                ${page !== 0 ? Prisma.sql([`OFFSET ${(page - 1) * count}`]) : Prisma.sql([""])}
            `) as FrequencyConfigurationTableRawModel[]
            ).map((model: FrequencyConfigurationTableRawModel): FrequencyConfigurationTableModel => {
                return {
                    id: model.id,
                    frequency: model.frequency,
                    createdAt: model.created_at,
                    updatedAt: model.updated_at,
                };
            });

            this.loggerService.debug(`Find Table Result: ${JSON.stringify(models)}`);

            return models;
        } catch (error) {
            this.loggerService.error(`Find Reader Configuration Id: ${error.message}`);

            throw new InternalServerErrorException("Internal Server Error");
        }
    }
}
