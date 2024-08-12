import { Controller, Get, Param, ParseIntPipe, Query, UseInterceptors } from "@nestjs/common";

import { ResponseFormatInterface } from "./../../common/interface/response-format.interface";
import { formatResponse, ResponseFormatInterceptor } from "./../../common/interceptor/response-format.interceptor";

import { BaseController } from "./../../global/base.controller";

import {
    FrequencyConfigurationModel,
    FrequencyConfigurationCreateDTO,
    FrequencyConfigurationUpdateDTO,
    FrequencyConfigurationTableModel,
} from "./frequency-configuration";
import { FrequencyConfigurationService } from "./frequency-configuration.service";

interface FrequencyConfigurationControllerInterface {
    findTable(
        readerConfigurationId: number,
        count: string,
        page: string,
        sortBy: string,
        sortOrder: string
    ): Promise<ResponseFormatInterface<FrequencyConfigurationTableModel[] | null>>;
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

    @Get("table/reader-configuration-id/:readerConfigurationId")
    public async findTable(
        @Param("readerConfigurationId", ParseIntPipe) readerConfigurationId: number,
        @Query("count") count: string = "0",
        @Query("page") page: string = "0",
        @Query("sortBy") sortBy: string = "id",
        @Query("sortOrder") sortOrder: string = "asc"
    ): Promise<ResponseFormatInterface<FrequencyConfigurationTableModel[] | null>> {
        try {
            this.loggerService.log("Find Table");

            const response: ResponseFormatInterface<FrequencyConfigurationTableModel[]> = formatResponse<
                FrequencyConfigurationTableModel[]
            >(
                true,
                200,
                "Found",
                await this.modelService.findTable(
                    readerConfigurationId,
                    parseInt(count),
                    parseInt(page),
                    sortBy,
                    sortOrder
                )
            );

            return response;
        } catch (error) {
            this.loggerService.error(`Find Table: ${error.message}`);

            return formatResponse<null>(false, 500, error.message, null);
        }
    }
}
