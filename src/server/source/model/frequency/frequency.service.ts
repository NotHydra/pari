import { Injectable, InternalServerErrorException } from "@nestjs/common";

import { PrismaService } from "./../../provider/prisma.service";

import { DetailedService } from "./../../global/detailed.service";

import {
    FrequencyModel,
    FrequencyCreateDTO,
    FrequencyUpdateDTO,
    FrequencyDetailedModel,
    FrequencyTableModel,
} from "./frequency";
import { PrismaDetailedModelInterface } from "./../../common/interface/prisma-model.interface";

interface FrequencyServiceInterface {
    findTable(tagId: number): Promise<FrequencyTableModel[]>;
}

@Injectable()
export class FrequencyService
    extends DetailedService<FrequencyModel, FrequencyDetailedModel, FrequencyCreateDTO, FrequencyUpdateDTO>
    implements FrequencyServiceInterface
{
    constructor(private readonly prismaService: PrismaService) {
        super(
            FrequencyService.name,
            prismaService.frequency as unknown as PrismaDetailedModelInterface<FrequencyModel, FrequencyDetailedModel>,
            {
                rssi: true,
            }
        );
    }

    public async findTable(tagId: number): Promise<FrequencyTableModel[]> {
        try {
            const models: FrequencyTableModel[] = await this.prismaService.$queryRaw`
                SELECT
                    frequency.id AS "id",
                    frequency.frequency AS "frequency",
                    ROUND(AVG(rssi.rssi), 4)::double precision AS "averageRSSI"

                FROM
                    frequency
                    INNER JOIN rssi ON frequency.id=rssi.frequency_id

                WHERE
                    frequency.tag_id=${tagId}
                    
                GROUP BY
                    frequency.id

                ORDER BY
                    frequency.id ASC
            `;

            this.loggerService.log(`Find Table: ${JSON.stringify(models)}`);

            return models;
        } catch (error) {
            this.loggerService.error(`Find Table: ${error.message}`);

            throw new InternalServerErrorException("Internal Server Error");
        }
    }
}
