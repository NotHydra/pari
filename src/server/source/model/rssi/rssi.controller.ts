import { Body, Controller, ForbiddenException, Param, ParseIntPipe, UseInterceptors } from "@nestjs/common";

import { Override } from "./../../common/decorator/override.decorator";
import { ResponseFormatInterceptor } from "./../../common/interceptor/response-format.interceptor";
import { ResponseFormatInterface } from "./../../common/interface/response-format.interface";

import { BaseController } from "./../../global/base.controller";

import { RSSIModel, RSSICreateDTO, RSSIUpdateDTO } from "./rssi";
import { RSSIService } from "./rssi.service";

interface RSSIControllerInterface {}

@Controller("rssi")
@UseInterceptors(ResponseFormatInterceptor)
export class RSSIController
    extends BaseController<RSSIModel, RSSICreateDTO, RSSIUpdateDTO, RSSIService>
    implements RSSIControllerInterface
{
    constructor(modelService: RSSIService) {
        super(RSSIController.name, modelService);
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
