import { Controller, UseInterceptors } from "@nestjs/common";

import { ResponseFormatInterceptor } from "./../../common/interceptor/response-format.interceptor";

import { BaseController } from "./../../global/base.controller";

import {
    FrequencyConfigurationModel,
    FrequencyConfigurationCreateDTO,
    FrequencyConfigurationUpdateDTO,
} from "./frequency-configuration";
import { FrequencyConfigurationService } from "./frequency-configuration.service";

interface FrequencyConfigurationControllerInterface {}

@Controller("frequency-configuration")
@UseInterceptors(ResponseFormatInterceptor)
export class FrequencyConfigurationController
    extends BaseController<
        FrequencyConfigurationModel,
        FrequencyConfigurationCreateDTO,
        FrequencyConfigurationUpdateDTO,
        FrequencyConfigurationService
    >
    implements FrequencyConfigurationControllerInterface
{
    constructor(modelService: FrequencyConfigurationService) {
        super(FrequencyConfigurationController.name, modelService);
    }
}
