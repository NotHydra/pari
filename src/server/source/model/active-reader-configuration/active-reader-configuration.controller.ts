import { Body, Controller, ForbiddenException, Get, Param, ParseIntPipe, UseInterceptors } from "@nestjs/common";

import { Override } from "./../../common/decorator/override.decorator";
import { formatResponse, ResponseFormatInterceptor } from "./../../common/interceptor/response-format.interceptor";
import { ResponseFormatInterface } from "./../../common/interface/response-format.interface";

import { DetailedController } from "./../../global/detailed.controller";

import {
    ActiveReaderConfigurationModel,
    ActiveReaderConfigurationCreateDTO,
    ActiveReaderConfigurationUpdateDTO,
    ActiveReaderConfigurationDetailedModel,
    ActiveReaderConfigurationRawModel,
} from "./active-reader-configuration";
import { ActiveReaderConfigurationService } from "./active-reader-configuration.service";

interface ActiveReaderConfigurationControllerInterface {
    findConfiguration(): Promise<ResponseFormatInterface<ActiveReaderConfigurationRawModel | null>>;
}

@Controller("active-reader-configuration")
@UseInterceptors(ResponseFormatInterceptor)
export class ActiveReaderConfigurationController
    extends DetailedController<
        ActiveReaderConfigurationModel,
        ActiveReaderConfigurationDetailedModel,
        ActiveReaderConfigurationCreateDTO,
        ActiveReaderConfigurationUpdateDTO,
        ActiveReaderConfigurationService
    >
    implements ActiveReaderConfigurationControllerInterface
{
    constructor(modelService: ActiveReaderConfigurationService) {
        super(ActiveReaderConfigurationController.name, modelService);
    }

    @Get("configuration")
    public async findConfiguration(): Promise<ResponseFormatInterface<ActiveReaderConfigurationRawModel | null>> {
        try {
            const response: ResponseFormatInterface<ActiveReaderConfigurationRawModel> =
                formatResponse<ActiveReaderConfigurationRawModel>(
                    true,
                    200,
                    "Configuration Found",
                    await this.modelService.findConfiguration()
                );

            this.loggerService.log(`Find Configuration: ${JSON.stringify(response)}`);

            return response;
        } catch (error) {
            this.loggerService.error(`Find Configuration: ${error.message}`);

            return formatResponse<null>(false, 500, error.message, null);
        }
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
    public async remove(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        @Param("id", ParseIntPipe) id: number
    ): Promise<ResponseFormatInterface<ActiveReaderConfigurationModel>> {
        this.loggerService.error(`Remove: Method Is Disabled`);

        throw new ForbiddenException("Method Is Disabled");
    }
}
