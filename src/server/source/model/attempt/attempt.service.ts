import { Injectable, InternalServerErrorException } from "@nestjs/common";

import { PrismaService } from "../../provider/prisma.service";

import { DetailedService } from "../../global/detailed.service";

import { AttemptModel, AttemptCreateDTO, AttemptUpdateDTO } from "./attempt";

interface AttemptServiceInterface {
    findLatest(): Promise<AttemptModel>;
}

@Injectable()
export class AttemptService
    extends DetailedService<AttemptModel, AttemptCreateDTO, AttemptUpdateDTO>
    implements AttemptServiceInterface
{
    constructor(prismaService: PrismaService) {
        super(AttemptService.name, prismaService.attempt, {
            frequency: { include: { rssi: true } },
        });
    }

    public async findLatest(): Promise<AttemptModel> {
        try {
            return await this.prismaModel.findFirst({ orderBy: { createdAt: "desc" }, include: this.detailed });
        } catch (error) {
            this.loggerService.error(`Latest: ${error.message}`);
            throw new InternalServerErrorException("Internal Server Error");
        }
    }
}
