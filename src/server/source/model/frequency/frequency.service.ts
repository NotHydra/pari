import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { PrismaService } from "./../../provider/prisma.service";

import { DetailedService } from "./../../global/detailed.service";

import {
    FrequencyModel,
    FrequencyCreateDTO,
    FrequencyUpdateDTO,
    FrequencyDetailedModel,
    FrequencyTableModel,
    FrequencyTableRawModel,
} from "./frequency";
import { PrismaDetailedModelInterface } from "./../../common/interface/prisma-model.interface";

interface FrequencyServiceInterface {
    findTable(
        tagId: number,
        count: number,
        page: number,
        sortBy: string,
        sortOrder: string
    ): Promise<FrequencyTableModel[]>;
}

@Injectable()
export class FrequencyService
    extends DetailedService<FrequencyModel, FrequencyDetailedModel, FrequencyCreateDTO, FrequencyUpdateDTO>
    implements FrequencyServiceInterface
{
    constructor(private readonly prismaService: PrismaService) {
        super(
            FrequencyService.name,
            FrequencyModel,
            prismaService.frequency as unknown as PrismaDetailedModelInterface<FrequencyModel, FrequencyDetailedModel>,
            {
                rssi: true,
            }
        );
    }

    public async findTable(
        tagId: number,
        count: number = 0,
        page: number = 0,
        sortBy: string = "id",
        sortOrder: string = "asc"
    ): Promise<FrequencyTableModel[]> {
        try {
            this.loggerService.log("Find Table");
            this.loggerService.debug(
                `Find Table Argument: ${JSON.stringify({ tagId, count, page, sortBy, sortOrder })}`
            );

            const models: FrequencyTableModel[] = (
                (await this.prismaService.$queryRaw`
                SELECT
                    frequency.id AS "id",
                    frequency.frequency AS "frequency",
                    COUNT(rssi.rssi)::INT AS "rssi_count",
                    ROUND(AVG(rssi.rssi), 4)::double precision AS "average_rssi"

                FROM
                    frequency
                    LEFT JOIN rssi ON frequency.id=rssi.frequency_id

                WHERE
                    frequency.tag_id=${tagId}
                    
                GROUP BY
                    frequency.id

                ORDER BY
                    ${Prisma.sql([sortBy])} ${Prisma.sql([sortOrder === "desc" ? "desc" : "asc"])}

                ${count !== 0 ? Prisma.sql([`LIMIT ${count}`]) : Prisma.sql([""])}

                ${page !== 0 ? Prisma.sql([`OFFSET ${(page - 1) * count}`]) : Prisma.sql([""])}
            `) as FrequencyTableRawModel[]
            ).map((model: FrequencyTableRawModel): FrequencyTableModel => {
                return {
                    id: model.id,
                    frequency: model.frequency,
                    rssiCount: model.rssi_count,
                    averageRSSI: model.average_rssi,
                };
            });

            this.loggerService.debug(`Find Table Result: ${JSON.stringify(models)}`);

            return models;
        } catch (error) {
            this.loggerService.error(`Find Table: ${error.message}`);

            throw new InternalServerErrorException("Internal Server Error");
        }
    }
}
