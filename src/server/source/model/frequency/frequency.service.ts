import { Injectable } from "@nestjs/common";

import { PrismaService } from "../../provider/prisma.service";

import { DetailedService } from "../../global/detailed.service";

import { FrequencyModel, FrequencyCreateDTO, FrequencyUpdateDTO } from "./frequency";

interface FrequencyServiceInterface {}

@Injectable()
export class FrequencyService
    extends DetailedService<FrequencyModel, FrequencyCreateDTO, FrequencyUpdateDTO>
    implements FrequencyServiceInterface
{
    constructor(prismaService: PrismaService) {
        super(FrequencyService.name, prismaService.frequency, {
            rssi: true,
        });
    }
}
