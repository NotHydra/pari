import { Injectable } from "@nestjs/common";

import { DetailedService } from "source/global/detailed.service";
import { PrismaService } from "../../provider/prisma.service";

import { AttemptModel, AttemptCreateDTO, AttemptUpdateDTO } from "./attempt";

interface AttemptServiceInterface {}

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
}
