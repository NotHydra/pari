import { Body, Controller, ForbiddenException, Param, ParseIntPipe, UseInterceptors } from "@nestjs/common";

import { Override } from "../../common/decorator/override";
import { ResponseFormatInterceptor } from "../../common/interceptor/response-format.interceptor";
import { ResponseFormatInterface } from "../../common/interface/response-format";

import { DetailedController } from "source/global/detailed.controller";

import { AttemptModel, AttemptCreateDTO, AttemptUpdateDTO } from "./attempt";
import { AttemptService } from "./attempt.service";

interface BookControllerInterface {}

@Controller("attempt")
@UseInterceptors(ResponseFormatInterceptor)
export class AttemptController
    extends DetailedController<AttemptModel, AttemptCreateDTO, AttemptUpdateDTO, AttemptService>
    implements BookControllerInterface
{
    constructor(modelService: AttemptService) {
        super(AttemptController.name, modelService);
    }

    @Override
    public async change(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        @Param("id", ParseIntPipe) id: number,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        @Body() payload: AttemptUpdateDTO
    ): Promise<ResponseFormatInterface<AttemptModel>> {
        this.loggerService.error(`Change: Method Is Disabled`);
        throw new ForbiddenException("Method Is Disabled");
    }

    @Override
    public async remove(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        @Param("id", ParseIntPipe) id: number
    ): Promise<ResponseFormatInterface<AttemptModel>> {
        this.loggerService.error(`Remove: Method Is Disabled`);
        throw new ForbiddenException("Method Is Disabled");
    }
}
