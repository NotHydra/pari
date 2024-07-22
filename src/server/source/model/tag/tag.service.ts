import { Injectable, InternalServerErrorException } from "@nestjs/common";

import { PrismaDetailedModelInterface } from "./../../common/interface/prisma-model.interface";

import { PrismaService } from "./../../provider/prisma.service";

import { DetailedService } from "./../../global/detailed.service";

import { TagModel, TagCreateDTO, TagUpdateDTO, TagDetailedModel } from "./tag";

interface TagServiceInterface {
    findLatest(): Promise<TagModel>;
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
}
