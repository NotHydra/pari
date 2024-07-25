import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";

import { PrismaDetailedModelInterface } from "./../../common/interface/prisma-model.interface";

import { average } from "./../../utility/average";

import { PrismaService } from "./../../provider/prisma.service";

import { DetailedService } from "./../../global/detailed.service";

import { TagModel, TagCreateDTO, TagUpdateDTO, TagDetailedModel, TagTableModel } from "./tag";
import { FrequencyDetailedModel } from "./../frequency/frequency";
import { RSSIModel } from "./../rssi/rssi";

interface TagServiceInterface {
    findLatest(): Promise<TagModel>;
    findRSSIByTag(tag: string): Promise<number>;
    findTable(): Promise<TagTableModel[]>;
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

    public async findLatest(): Promise<TagModel> {
        try {
            return await this.prismaModel.findFirst({ orderBy: { createdAt: "desc" }, include: this.detailed });
        } catch (error) {
            this.loggerService.error(`Latest: ${error.message}`);

            throw new InternalServerErrorException("Internal Server Error");
        }
    }

    public async findRSSIByTag(tag: string): Promise<number> {
        try {
            this.loggerService.debug(`Find RSSI By Tag: ${tag}`);

            const model: TagDetailedModel = await this.prismaModel.findFirst({
                where: { tag },
                orderBy: { id: "desc" },
                include: this.detailed,
            });

            if (!model) {
                throw new NotFoundException(`Tag ${tag} Not Found`);
            }

            this.loggerService.debug(JSON.stringify(model));

            const averageRSSI: number = average(
                model.frequency.map((frequency: FrequencyDetailedModel) => {
                    return average(
                        frequency.rssi.map((rssi: RSSIModel) => {
                            return rssi.rssi;
                        })
                    );
                })
            );

            this.loggerService.log(`Find RSSI By Tag: ${JSON.stringify(averageRSSI)}`);

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

    public async findTable(): Promise<TagTableModel[]> {
        try {
            const models: TagTableModel[] = await this.prismaService.$queryRaw`
                SELECT
                    tag.id AS "id",
                    tag.reader_configuration_id AS "readerConfigurationId",
                    tag.tag AS "tag",
                    tag.created_at AS "createdAt",
                    reader_configuration.name AS "readerConfigurationName",
                    ROUND(AVG(rssi.rssi), 4)::double precision AS "averageRSSI"
                    
                FROM
                    tag
                    INNER JOIN reader_configuration ON tag.reader_configuration_id=reader_configuration.id
                    INNER JOIN frequency ON tag.id=frequency.tag_id
                    INNER JOIN rssi ON frequency.id=rssi.frequency_id
                    
                GROUP BY
                    tag.id,
                    reader_configuration.name
                    
                ORDER BY
                    tag.id ASC
            `;

            this.loggerService.log(`Find Table: ${JSON.stringify(models)}`);

            return models;
        } catch (error) {
            this.loggerService.error(`Find Table: ${error.message}`);

            throw new InternalServerErrorException("Internal Server Error");
        }
    }
}
