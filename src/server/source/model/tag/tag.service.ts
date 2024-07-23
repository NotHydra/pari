import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";

import { PrismaDetailedModelInterface } from "./../../common/interface/prisma-model.interface";

import { average } from "./../../utility/average";

import { PrismaService } from "./../../provider/prisma.service";

import { DetailedService } from "./../../global/detailed.service";

import { TagModel, TagCreateDTO, TagUpdateDTO, TagDetailedModel } from "./tag";
import { FrequencyDetailedModel } from "./../frequency/frequency";
import { RSSIModel } from "./../rssi/rssi";

interface TagServiceInterface {
    findLatest(): Promise<TagModel>;
    findRSSIByTag(tag: string): Promise<number>;
}

@Injectable()
export class TagService
    extends DetailedService<TagModel, TagDetailedModel, TagCreateDTO, TagUpdateDTO>
    implements TagServiceInterface
{
    constructor(prismaService: PrismaService) {
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
}
