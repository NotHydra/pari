import { Injectable } from "@nestjs/common";

import { PrismaService } from "./../../provider/prisma.service";

import { BaseService } from "./../../global/base.service";

import {
    FrequencyConfigurationModel,
    FrequencyConfigurationCreateDTO,
    FrequencyConfigurationUpdateDTO,
} from "./frequency-configuration";
import { PrismaModelInterface } from "source/common/interface/prisma-model.interface";

interface FrequencyConfigurationServiceInterface {}

@Injectable()
export class FrequencyConfigurationService
    extends BaseService<FrequencyConfigurationModel, FrequencyConfigurationCreateDTO, FrequencyConfigurationUpdateDTO>
    implements FrequencyConfigurationServiceInterface
{
    constructor(prismaService: PrismaService) {
        super(
            FrequencyConfigurationService.name,
            prismaService.frequencyConfiguration as unknown as PrismaModelInterface<FrequencyConfigurationModel>
        );
    }
}
