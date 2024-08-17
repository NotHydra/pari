import { Body, Controller, ForbiddenException, Get, Param, ParseIntPipe, Query, UseInterceptors } from "@nestjs/common";

import { Override } from "./../../common/decorator/override.decorator";
import { formatResponse, ResponseFormatInterceptor } from "./../../common/interceptor/response-format.interceptor";
import { ResponseFormatInterface } from "./../../common/interface/response-format.interface";

import { DetailedController } from "./../../global/detailed.controller";

import {
    FrequencyModel,
    FrequencyCreateDTO,
    FrequencyUpdateDTO,
    FrequencyDetailedModel,
    FrequencyTableModel,
} from "./frequency";
import { FrequencyService } from "./frequency.service";

interface FrequencyControllerInterface {
    findTable(
        tagId: number,
        count: string,
        page: string,
        search: string,
        sortBy: string,
        sortOrder: string
    ): Promise<ResponseFormatInterface<FrequencyTableModel[] | null>>;
}

@Controller("frequency")
@UseInterceptors(ResponseFormatInterceptor)
export class FrequencyController
    extends DetailedController<
        FrequencyModel,
        FrequencyDetailedModel,
        FrequencyCreateDTO,
        FrequencyUpdateDTO,
        FrequencyService
    >
    implements FrequencyControllerInterface
{
    constructor(modelService: FrequencyService) {
        super(FrequencyController.name, modelService);
    }

    @Get("table/tag-id/:tagId")
    public async findTable(
        @Param("tagId", ParseIntPipe) tagId: number,
        @Query("count") count: string = "0",
        @Query("page") page: string = "0",
        @Query("search") search: string = "",
        @Query("sortBy") sortBy: string = "id",
        @Query("sortOrder") sortOrder: string = "asc"
    ): Promise<ResponseFormatInterface<FrequencyTableModel[] | null>> {
        try {
            this.loggerService.log("Find Table");

            const response: ResponseFormatInterface<FrequencyTableModel[]> = formatResponse<FrequencyTableModel[]>(
                true,
                200,
                "Table Found",
                await this.modelService.findTable(tagId, parseInt(count), parseInt(page), search, sortBy, sortOrder)
            );

            return response;
        } catch (error) {
            this.loggerService.error(`Find Table: ${error.message}`);

            return formatResponse<null>(false, 500, error.message, null);
        }
    }

    @Override
    public async change(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        @Param("id", ParseIntPipe) id: number,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        @Body() payload: FrequencyUpdateDTO
    ): Promise<ResponseFormatInterface<FrequencyModel>> {
        this.loggerService.error(`Change: Method Is Disabled`);

        throw new ForbiddenException("Method Is Disabled");
    }

    @Override
    public async remove(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        @Param("id", ParseIntPipe) id: number
    ): Promise<ResponseFormatInterface<FrequencyModel>> {
        this.loggerService.error(`Remove: Method Is Disabled`);

        throw new ForbiddenException("Method Is Disabled");
    }
}
