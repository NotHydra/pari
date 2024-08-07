import { Controller, Get, Param, ParseIntPipe, Query, UseInterceptors } from "@nestjs/common";

import { formatResponse, ResponseFormatInterceptor } from "./../../common/interceptor/response-format.interceptor";

import { BaseController } from "./../../global/base.controller";

import {
    FrequencyConfigurationModel,
    FrequencyConfigurationCreateDTO,
    FrequencyConfigurationUpdateDTO,
} from "./frequency-configuration";
import { FrequencyConfigurationService } from "./frequency-configuration.service";
import { ResponseFormatInterface } from "source/common/interface/response-format.interface";

interface FrequencyConfigurationControllerInterface {
    findReaderConfigurationId(
        readerConfigurationId: number,
        page: string,
        count: string
    ): Promise<ResponseFormatInterface<FrequencyConfigurationModel[] | null>>;
}

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

    @Get("reader-configuration-id/:readerConfigurationId")
    public async findReaderConfigurationId(
        @Param("readerConfigurationId", ParseIntPipe) readerConfigurationId: number,
        @Query("page") page: string = "0",
        @Query("count") count: string = "0"
    ): Promise<ResponseFormatInterface<FrequencyConfigurationModel[] | null>> {
        try {
            this.loggerService.log("Find Reader Configuration Id");

            const response: ResponseFormatInterface<FrequencyConfigurationModel[]> = formatResponse<
                FrequencyConfigurationModel[]
            >(
                true,
                200,
                "Found",
                await this.modelService.findReaderConfigurationId(
                    readerConfigurationId,
                    parseInt(page),
                    parseInt(count)
                )
            );

            return response;
        } catch (error) {
            this.loggerService.error(`Find Reader Configuration Id: ${error.message}`);

            return formatResponse<null>(false, 500, error.message, null);
        }
    }
}
