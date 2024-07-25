import { Body, Controller, ForbiddenException, Get, Param, ParseIntPipe, UseInterceptors } from "@nestjs/common";

import { Override } from "./../../common/decorator/override.decorator";
import { ResponseFormatInterceptor, formatResponse } from "./../../common/interceptor/response-format.interceptor";
import { ResponseFormatInterface } from "./../../common/interface/response-format.interface";

import { DetailedController } from "./../../global/detailed.controller";

import { TagModel, TagCreateDTO, TagUpdateDTO, TagDetailedModel, TagTableModel } from "./tag";
import { TagService } from "./tag.service";

interface TagControllerInterface {
    findLatest(): Promise<ResponseFormatInterface<TagModel | null>>;
    findRSSIByTag(tag: string): Promise<ResponseFormatInterface<number | null>>;
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

    @Get("rssi-by-tag/:tag")
    public async findRSSIByTag(@Param("tag") tag: string): Promise<ResponseFormatInterface<number | null>> {
        try {
            const response: ResponseFormatInterface<number> = formatResponse<number>(
                true,
                200,
                `RSSI By Tag ${tag} Found`,
                await this.modelService.findRSSIByTag(tag)
            );

            this.loggerService.log(`Find RSSI By Tag: ${JSON.stringify(response)}`);

            return response;
        } catch (error) {
            this.loggerService.error(`Find RSSI By Tag: ${error.message}`);

            return formatResponse<null>(false, 500, error.message, null);
        }
    }

    @Get("table")
    public async findTable(): Promise<ResponseFormatInterface<TagTableModel[] | null>> {
        try {
            const response: ResponseFormatInterface<TagTableModel[]> = formatResponse<TagTableModel[]>(
                true,
                200,
                "Table Found",
                await this.modelService.findTable()
            );

            this.loggerService.log(`Find Table: ${JSON.stringify(response)}`);

            return response;
        } catch (error) {
            this.loggerService.error(`Find Table: ${error.message}`);

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
