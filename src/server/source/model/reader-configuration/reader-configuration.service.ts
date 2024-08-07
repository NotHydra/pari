import { Injectable, InternalServerErrorException } from "@nestjs/common";

import { PrismaService } from "./../../provider/prisma.service";

import { DetailedService } from "./../../global/detailed.service";

import {
    ReaderConfigurationModel,
    ReaderConfigurationCreateDTO,
    ReaderConfigurationUpdateDTO,
    ReaderConfigurationDetailedModel,
    ReaderConfigurationTableModel,
} from "./reader-configuration";
import { PrismaDetailedModelInterface } from "source/common/interface/prisma-model.interface";

interface ReaderConfigurationServiceInterface {
    findTable(): Promise<ReaderConfigurationTableModel[]>;
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

    public async findTable(): Promise<ReaderConfigurationTableModel[]> {
        try {
            this.loggerService.log("Find Table");

            const models: ReaderConfigurationTableModel[] = await this.prismaService.$queryRaw`
                SELECT
                    reader_configuration.id AS "id", 
                    reader_configuration.name AS "name", 
                    reader_configuration.rssi_scan_count AS "rssiScanCount", 
                    reader_configuration.rssi_scan_interval AS "rssiScanInterval", 
                    reader_configuration.created_at AS "createdAt", 
                    reader_configuration.updated_at AS "updatedAt", 
                    COUNT(frequency_configuration)::INT AS "frequencyConfigurationCount" 
                    
                FROM
                    reader_configuration 
                    LEFT JOIN frequency_configuration ON reader_configuration.id=frequency_configuration.reader_configuration_id 
                
                GROUP BY
                    reader_configuration.id
                
                ORDER BY
                    reader_configuration.id ASC
            `;

            this.loggerService.debug(`Find Table Result: ${JSON.stringify(models)}`);

            return models;
        } catch (error) {
            this.loggerService.error(`Find Table: ${error.message}`);

            throw new InternalServerErrorException("Internal Server Error");
        }
    }
}
