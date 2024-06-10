import { Body, Controller, ForbiddenException, Param, ParseIntPipe, UseInterceptors } from "@nestjs/common";
import { ResponseInventory } from "@prisma/client";

import { Override } from "../../common/decorator/override";
import { ResponseFormatInterceptor } from "../../common/interceptor/response-format.interceptor";
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
