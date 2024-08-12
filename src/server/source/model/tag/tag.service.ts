import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { PrismaDetailedModelInterface } from "./../../common/interface/prisma-model.interface";

import { average } from "../../utility/average.utility";

import { PrismaService } from "./../../provider/prisma.service";

import { DetailedService } from "./../../global/detailed.service";

import { TagModel, TagCreateDTO, TagUpdateDTO, TagDetailedModel, TagTableModel, TagTableRawModel } from "./tag";
import { FrequencyDetailedModel } from "./../frequency/frequency";
import { RSSIModel } from "./../rssi/rssi";

interface TagServiceInterface {
    findRSSIByTag(tag: string): Promise<number>;
    findTable(count: number, page: number, sortBy: string, sortOrder: string): Promise<TagTableModel[]>;
}

@Injectable()
export class TagService
    extends DetailedService<TagModel, TagDetailedModel, TagCreateDTO, TagUpdateDTO>
    implements TagServiceInterface
{
    constructor(private readonly prismaService: PrismaService) {
        super(
            TagService.name,
            prismaService.tag as unknown as PrismaDetailedModelInterface<TagModel, TagDetailedModel>,
            {
                frequency: { include: { rssi: true } },
            }
        );
    }

    public async findRSSIByTag(tag: string): Promise<number> {
        try {
            this.loggerService.log("Find RSSI By Tag");
            this.loggerService.debug(`Find RSSI By Tag Argument: ${JSON.stringify({ tag })}`);

            const model: TagDetailedModel = await this.prismaModel.findFirst({
                where: { tag },
                orderBy: { id: "desc" },
                include: this.detailed,
            });

            if (!model) {
                throw new NotFoundException(`Tag ${tag} Not Found`);
            }

            const averageRSSI: number = average(
                model.frequency.map((frequency: FrequencyDetailedModel) => {
                    return average(
                        frequency.rssi.map((rssi: RSSIModel) => {
                            return rssi.rssi;
                        })
                    );
                })
            );

            this.loggerService.debug(`Find RSSI By Tag Result: ${averageRSSI}`);

            return averageRSSI;
        } catch (error) {
            if (error instanceof NotFoundException) {
                this.loggerService.error(`Find RSSI By Tag: ${error.message}`);

                throw error;
            }

            this.loggerService.error(`Find RSSI By Tag: ${error.message}`);

            throw new InternalServerErrorException("Internal Server Error");
        }
    }

    public async findTable(
        count: number = 0,
        page: number = 0,
        sortBy: string = "id",
        sortOrder: string = "asc"
    ): Promise<TagTableModel[]> {
        try {
            this.loggerService.log("Find Table");
            this.loggerService.debug(`Find Table Argument: ${JSON.stringify({ count, page, sortBy, sortOrder })}`);

            const models: TagTableModel[] = (
                (await this.prismaService.$queryRaw`
                SELECT
                    tag.id AS "id",
                    tag.tag AS "tag",
                    tag.created_at AS "created_at",
                    reader_configuration.name AS "reader_configuration_name",
                    COUNT(rssi.rssi)::INT AS "rssi_count",
                    ROUND(AVG(rssi.rssi), 4)::double precision AS "average_rssi"
                    
                FROM
                    tag
                    INNER JOIN reader_configuration ON tag.reader_configuration_id=reader_configuration.id
                    LEFT JOIN frequency ON tag.id=frequency.tag_id
                    LEFT JOIN rssi ON frequency.id=rssi.frequency_id
                    
                GROUP BY
                    tag.id,
                    reader_configuration.name
                    
                ORDER BY
                    ${Prisma.sql([sortBy])} ${Prisma.sql([sortOrder === "desc" ? "desc" : "asc"])}

                ${count !== 0 ? Prisma.sql([`LIMIT ${count}`]) : Prisma.sql([""])}

                ${page !== 0 ? Prisma.sql([`OFFSET ${(page - 1) * count}`]) : Prisma.sql([""])}
            `) as TagTableRawModel[]
            ).map((model: TagTableRawModel): TagTableModel => {
                return {
                    id: model.id,
                    tag: model.tag,
                    createdAt: model.created_at,
                    readerConfigurationName: model.reader_configuration_name,
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
