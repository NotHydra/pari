import { Controller, UseInterceptors } from "@nestjs/common";

import { ResponseFormatInterceptor } from "./../../common/interceptor/response-format.interceptor";

import { DetailedController } from "./../../global/detailed.controller";

import {
    ReaderConfigurationModel,
    ReaderConfigurationCreateDTO,
    ReaderConfigurationUpdateDTO,
} from "./reader-configuration";
import { ReaderConfigurationService } from "./reader-configuration.service";

interface ReaderConfigurationControllerInterface {}

@Controller("reader-configuration")
@UseInterceptors(ResponseFormatInterceptor)
export class ReaderConfigurationController
    extends DetailedController<
        ReaderConfigurationModel,
        ReaderConfigurationCreateDTO,
        ReaderConfigurationUpdateDTO,
        ReaderConfigurationService
    >
    implements ReaderConfigurationControllerInterface
{
    constructor(modelService: ReaderConfigurationService) {
        super(ReaderConfigurationController.name, modelService);
    }
}
