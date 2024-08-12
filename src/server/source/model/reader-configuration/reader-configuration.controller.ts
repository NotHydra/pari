import { Controller, Get, Query, UseInterceptors } from "@nestjs/common";

import { formatResponse, ResponseFormatInterceptor } from "./../../common/interceptor/response-format.interceptor";
import { ResponseFormatInterface } from "./../../common/interface/response-format.interface";

import { DetailedController } from "./../../global/detailed.controller";

import {
    ReaderConfigurationModel,
    ReaderConfigurationCreateDTO,
    ReaderConfigurationUpdateDTO,
    ReaderConfigurationDetailedModel,
    ReaderConfigurationTableModel,
} from "./reader-configuration";
import { ReaderConfigurationService } from "./reader-configuration.service";

interface ReaderConfigurationControllerInterface {
    findTable(
        count: string,
        page: string,
        sortBy: string,
        sortOrder: string
    ): Promise<ResponseFormatInterface<ReaderConfigurationTableModel[] | null>>;
}

@Controller("reader-configuration")
@UseInterceptors(ResponseFormatInterceptor)
export class ReaderConfigurationController
    extends DetailedController<
        ReaderConfigurationModel,
        ReaderConfigurationDetailedModel,
        ReaderConfigurationCreateDTO,
        ReaderConfigurationUpdateDTO,
        ReaderConfigurationService
    >
    implements ReaderConfigurationControllerInterface
{
    constructor(modelService: ReaderConfigurationService) {
        super(ReaderConfigurationController.name, modelService);
    }

    @Get("table")
    public async findTable(
        @Query("count") count: string = "0",
        @Query("page") page: string = "0",
        @Query("sortBy") sortBy: string = "id",
        @Query("sortOrder") sortOrder: string = "asc"
    ): Promise<ResponseFormatInterface<ReaderConfigurationTableModel[] | null>> {
        try {
            this.loggerService.log("Find Table");

            const response: ResponseFormatInterface<ReaderConfigurationTableModel[]> = formatResponse<
                ReaderConfigurationTableModel[]
            >(
                true,
                200,
                "Table Found",
                await this.modelService.findTable(parseInt(count), parseInt(page), sortBy, sortOrder)
            );

            return response;
        } catch (error) {
            this.loggerService.error(`Find Table: ${error.message}`);

            return formatResponse<null>(false, 500, error.message, null);
        }
    }
}
