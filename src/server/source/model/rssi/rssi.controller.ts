import { Body, Controller, ForbiddenException, Get, Param, ParseIntPipe, Query, UseInterceptors } from "@nestjs/common";

import { Override } from "./../../common/decorator/override.decorator";
import { formatResponse, ResponseFormatInterceptor } from "./../../common/interceptor/response-format.interceptor";
import { ResponseFormatInterface } from "./../../common/interface/response-format.interface";

import { BaseController } from "./../../global/base.controller";

import { RSSIModel, RSSICreateDTO, RSSIUpdateDTO, RSSITableModel } from "./rssi";
import { RSSIService } from "./rssi.service";

interface RSSIControllerInterface {
    findTable(
        frequencyId: number,
        count: string,
        page: string,
        search: string,
        sortBy: string,
        sortOrder: string
    ): Promise<ResponseFormatInterface<RSSITableModel[] | null>>;
}

@Controller("rssi")
@UseInterceptors(ResponseFormatInterceptor)
export class RSSIController
    extends BaseController<RSSIModel, RSSICreateDTO, RSSIUpdateDTO, RSSIService>
    implements RSSIControllerInterface
{
    constructor(modelService: RSSIService) {
        super(RSSIController.name, modelService);
    }

    @Get("table/frequency-id/:frequencyId")
    public async findTable(
        @Param("frequencyId", ParseIntPipe) frequencyId: number,
        @Query("count") count: string = "0",
        @Query("page") page: string = "0",
        @Query("search") search: string = "",
        @Query("sortBy") sortBy: string = "id",
        @Query("sortOrder") sortOrder: string = "asc"
    ): Promise<ResponseFormatInterface<RSSITableModel[] | null>> {
        try {
            this.loggerService.log("Find Table");

            const response: ResponseFormatInterface<RSSITableModel[]> = formatResponse<RSSITableModel[]>(
                true,
                200,
                "Table Found",
                await this.modelService.findTable(
                    frequencyId,
                    parseInt(count),
                    parseInt(page),
                    search,
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

    @Override
    public async change(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        @Param("id", ParseIntPipe) id: number,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        @Body() payload: RSSIUpdateDTO
    ): Promise<ResponseFormatInterface<RSSIModel>> {
        this.loggerService.error(`Change: Method Is Disabled`);

        throw new ForbiddenException("Method Is Disabled");
    }

    @Override
    public async remove(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        @Param("id", ParseIntPipe) id: number
    ): Promise<ResponseFormatInterface<RSSIModel>> {
        this.loggerService.error(`Remove: Method Is Disabled`);

        throw new ForbiddenException("Method Is Disabled");
    }
}
