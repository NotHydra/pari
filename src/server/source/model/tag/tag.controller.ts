import { Body, Controller, ForbiddenException, Get, Param, ParseIntPipe, UseInterceptors } from "@nestjs/common";

import { Override } from "./../../common/decorator/override.decorator";
import { ResponseFormatInterceptor, formatResponse } from "./../../common/interceptor/response-format.interceptor";
import { ResponseFormatInterface } from "./../../common/interface/response-format.interface";

import { DetailedController } from "./../../global/detailed.controller";

import { TagModel, TagCreateDTO, TagUpdateDTO, TagDetailedModel } from "./tag";
import { TagService } from "./tag.service";

interface TagControllerInterface {
    findLatest(): Promise<ResponseFormatInterface<TagModel | null>>;
}

@Controller("tag")
@UseInterceptors(ResponseFormatInterceptor)
export class TagController
    extends DetailedController<TagModel, TagDetailedModel, TagCreateDTO, TagUpdateDTO, TagService>
    implements TagControllerInterface
{
    constructor(modelService: TagService) {
        super(TagController.name, modelService);
    }

    @Get("latest")
    public async findLatest(): Promise<ResponseFormatInterface<TagModel | null>> {
        try {
            const response: ResponseFormatInterface<TagModel> = formatResponse<TagModel>(
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
    public async remove(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        @Param("id", ParseIntPipe) id: number
    ): Promise<ResponseFormatInterface<TagModel>> {
        this.loggerService.error(`Remove: Method Is Disabled`);

        throw new ForbiddenException("Method Is Disabled");
    }
}
