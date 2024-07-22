import { Injectable } from "@nestjs/common";

import { PrismaService } from "./../../provider/prisma.service";

import { DetailedService } from "./../../global/detailed.service";

import { FrequencyModel, FrequencyCreateDTO, FrequencyUpdateDTO, FrequencyDetailedModel } from "./frequency";
import { PrismaDetailedModelInterface } from "./../../common/interface/prisma-model.interface";

interface FrequencyServiceInterface {}

@Injectable()
export class FrequencyService
    extends DetailedService<FrequencyModel, FrequencyDetailedModel, FrequencyCreateDTO, FrequencyUpdateDTO>
    implements FrequencyServiceInterface
{
    constructor(prismaService: PrismaService) {
        super(
            FrequencyService.name,
            prismaService.frequency as unknown as PrismaDetailedModelInterface<FrequencyModel, FrequencyDetailedModel>,
            {
                rssi: true,
            }
        );
    }
}
