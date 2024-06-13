import { Body, Controller, ForbiddenException, Get, Param, ParseIntPipe, UseInterceptors } from "@nestjs/common";

import { Override } from "../../common/decorator/override";
import { ResponseFormatInterceptor, formatResponse } from "../../common/interceptor/response-format.interceptor";
import { ResponseFormatInterface } from "../../common/interface/response-format";

import { DetailedController } from "../../global/detailed.controller";

import { AttemptModel, AttemptCreateDTO, AttemptUpdateDTO } from "./attempt";
import { AttemptService } from "./attempt.service";

interface AttemptControllerInterface {
    findLatest(): Promise<ResponseFormatInterface<AttemptModel>>;
}

@Controller("attempt")
@UseInterceptors(ResponseFormatInterceptor)
export class AttemptController
    extends DetailedController<AttemptModel, AttemptCreateDTO, AttemptUpdateDTO, AttemptService>
    implements AttemptControllerInterface
{
    constructor(modelService: AttemptService) {
        super(AttemptController.name, modelService);
    }

    @Get("latest")
    public async findLatest(): Promise<ResponseFormatInterface<AttemptModel>> {
        try {
            const response: ResponseFormatInterface<AttemptModel> = formatResponse<AttemptModel>(
                true,
                200,
                "Found Latest",
                await this.modelService.findLatest()
            );

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
