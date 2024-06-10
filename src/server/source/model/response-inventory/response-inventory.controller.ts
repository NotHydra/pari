import { Body, Controller, ForbiddenException, Get, Param, ParseIntPipe, UseInterceptors } from "@nestjs/common";
import { ResponseInventory } from "@prisma/client";

import { Override } from "../../common/decorator/override";
import { formatResponse, ResponseFormatInterceptor } from "../../common/interceptor/response-format.interceptor";
import { ResponseFormatInterface } from "../../common/interface/response-format";

import { BaseController } from "../../global/base.controller";

import { ResponseInventoryCreateDTO, ResponseInventoryModel, ResponseInventoryUpdateDTO } from "./response-inventory";
import { ResponseInventoryService } from "./response-inventory.service";

interface BookControllerInterface {}

@Controller("response-inventory")
@UseInterceptors(ResponseFormatInterceptor)
export class ResponseInventoryController
    extends BaseController<
        ResponseInventoryModel,
        ResponseInventoryCreateDTO,
        ResponseInventoryUpdateDTO,
        ResponseInventoryService
    >
    implements BookControllerInterface
{
    constructor(modelService: ResponseInventoryService) {
        super(ResponseInventoryController.name, modelService);
    }

    @Get("latest")
    public async findLatest(): Promise<ResponseFormatInterface<ResponseInventoryModel[]>> {
        try {
            const response: ResponseFormatInterface<ResponseInventoryModel[]> = formatResponse<
                ResponseInventoryModel[]
            >(true, 200, "Found Latest", await this.modelService.findLatest());

            this.loggerService.log(`Find Latest: ${JSON.stringify(response)}`);

            return response;
        } catch (error) {
            this.loggerService.error(`Find Latest: ${error.message}`);
            return formatResponse<null>(false, 500, error.message, null);
        }
    }

    @Override
    public async change(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        @Param("id", ParseIntPipe) id: number,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        @Body() payload: ResponseInventoryUpdateDTO
    ): Promise<ResponseFormatInterface<ResponseInventory>> {
        this.loggerService.error(`Change: Method Is Disabled`);
        throw new ForbiddenException("Method Is Disabled");
    }

    @Override
    public async remove(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        @Param("id", ParseIntPipe) id: number
    ): Promise<ResponseFormatInterface<ResponseInventory>> {
        this.loggerService.error(`Remove: Method Is Disabled`);
        throw new ForbiddenException("Method Is Disabled");
    }
}
