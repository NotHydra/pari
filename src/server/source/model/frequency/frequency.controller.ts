import { Body, Controller, ForbiddenException, Param, ParseIntPipe, UseInterceptors } from "@nestjs/common";

import { Override } from "../../common/decorator/override";
import { ResponseFormatInterceptor } from "../../common/interceptor/response-format.interceptor";
import { ResponseFormatInterface } from "../../common/interface/response-format";

import { DetailedController } from "source/global/detailed.controller";

import { FrequencyModel, FrequencyCreateDTO, FrequencyUpdateDTO } from "./frequency";
import { FrequencyService } from "./frequency.service";

interface FrequencyControllerInterface {}

@Controller("frequency")
@UseInterceptors(ResponseFormatInterceptor)
export class FrequencyController
    extends DetailedController<FrequencyModel, FrequencyCreateDTO, FrequencyUpdateDTO, FrequencyService>
    implements FrequencyControllerInterface
{
    constructor(modelService: FrequencyService) {
        super(FrequencyController.name, modelService);
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
