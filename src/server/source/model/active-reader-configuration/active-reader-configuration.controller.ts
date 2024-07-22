import { Body, Controller, ForbiddenException, Param, ParseIntPipe, UseInterceptors } from "@nestjs/common";

import { Override } from "./../../common/decorator/override.decorator";
import { ResponseFormatInterceptor } from "./../../common/interceptor/response-format.interceptor";
import { ResponseFormatInterface } from "./../../common/interface/response-format.interface";

import { DetailedController } from "./../../global/detailed.controller";

import {
    ActiveReaderConfigurationModel,
    ActiveReaderConfigurationCreateDTO,
    ActiveReaderConfigurationUpdateDTO,
} from "./active-reader-configuration";
import { ActiveReaderConfigurationService } from "./active-reader-configuration.service";

interface ActiveReaderConfigurationControllerInterface {}

@Controller("active-reader-configuration")
@UseInterceptors(ResponseFormatInterceptor)
export class ActiveReaderConfigurationController
    extends DetailedController<
        ActiveReaderConfigurationModel,
        ActiveReaderConfigurationCreateDTO,
        ActiveReaderConfigurationUpdateDTO,
        ActiveReaderConfigurationService
    >
    implements ActiveReaderConfigurationControllerInterface
{
    constructor(modelService: ActiveReaderConfigurationService) {
        super(ActiveReaderConfigurationController.name, modelService);
    }

    @Override
    public async create(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        @Body() payload: ActiveReaderConfigurationCreateDTO
    ): Promise<ResponseFormatInterface<ActiveReaderConfigurationModel>> {
        this.loggerService.error(`Create: Method Is Disabled`);

        throw new ForbiddenException("Method Is Disabled");
    }

    @Override
    public async change(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        @Param("id", ParseIntPipe) id: number,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        @Body() payload: ActiveReaderConfigurationUpdateDTO
    ): Promise<ResponseFormatInterface<ActiveReaderConfigurationModel>> {
        this.loggerService.error(`Change: Method Is Disabled`);

        throw new ForbiddenException("Method Is Disabled");
    }

    @Override
    public async remove(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        @Param("id", ParseIntPipe) id: number
    ): Promise<ResponseFormatInterface<ActiveReaderConfigurationModel>> {
        this.loggerService.error(`Remove: Method Is Disabled`);

        throw new ForbiddenException("Method Is Disabled");
    }
}
