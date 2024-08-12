import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { PrismaDetailedModelInterface } from "./../../common/interface/prisma-model.interface";

import { PrismaService } from "./../../provider/prisma.service";

import { DetailedService } from "./../../global/detailed.service";

import {
    ReaderConfigurationModel,
    ReaderConfigurationCreateDTO,
    ReaderConfigurationUpdateDTO,
    ReaderConfigurationDetailedModel,
    ReaderConfigurationTableModel,
    ReaderConfigurationTableRawModel,
} from "./reader-configuration";

interface ReaderConfigurationServiceInterface {
    findTable(count: number, page: number, sortBy: string, sortOrder: string): Promise<ReaderConfigurationTableModel[]>;
}

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
    constructor(private readonly prismaService: PrismaService) {
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

    public async findTable(
        count: number = 0,
        page: number = 0,
        sortBy: string = "id",
        sortOrder: string = "asc"
    ): Promise<ReaderConfigurationTableModel[]> {
        try {
            this.loggerService.log("Find Table");
            this.loggerService.debug(`Find Table Argument: ${JSON.stringify({ count, page, sortBy, sortOrder })}`);

            const models: ReaderConfigurationTableModel[] = (
                (await this.prismaService.$queryRaw`
                SELECT
                    reader_configuration.id AS "id", 
                    reader_configuration.name AS "name", 
                    reader_configuration.rssi_scan_count AS "rssi_scan_count", 
                    reader_configuration.rssi_scan_interval AS "rssi_scan_interval", 
                    reader_configuration.created_at AS "created_at", 
                    reader_configuration.updated_at AS "updated_at", 
                    COUNT(frequency_configuration)::INT AS "frequency_configuration_count" 
                    
                FROM
                    reader_configuration 
                    LEFT JOIN frequency_configuration ON reader_configuration.id=frequency_configuration.reader_configuration_id 
                
                GROUP BY
                    reader_configuration.id
                
                ORDER BY
                    ${Prisma.sql([sortBy])} ${Prisma.sql([sortOrder === "desc" ? "desc" : "asc"])}

                ${count !== 0 ? Prisma.sql([`LIMIT ${count}`]) : Prisma.sql([""])}

                ${page !== 0 ? Prisma.sql([`OFFSET ${(page - 1) * count}`]) : Prisma.sql([""])}
            `) as ReaderConfigurationTableRawModel[]
            ).map((model: ReaderConfigurationTableRawModel): ReaderConfigurationTableModel => {
                return {
                    id: model.id,
                    name: model.name,
                    rssiScanCount: model.rssi_scan_count,
                    rssiScanInterval: model.rssi_scan_interval,
                    createdAt: model.created_at,
                    updatedAt: model.updated_at,
                    frequencyConfigurationCount: model.frequency_configuration_count,
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
