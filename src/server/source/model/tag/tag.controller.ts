import { Controller, Get, Param, Query, UseInterceptors } from "@nestjs/common";

import { ResponseFormatInterceptor, formatResponse } from "./../../common/interceptor/response-format.interceptor";
import { ResponseFormatInterface } from "./../../common/interface/response-format.interface";

import { DetailedController } from "./../../global/detailed.controller";

import { TagModel, TagCreateDTO, TagUpdateDTO, TagDetailedModel, TagTableModel } from "./tag";
import { TagService } from "./tag.service";

interface TagControllerInterface {
    findRSSIByTag(tag: string): Promise<ResponseFormatInterface<number | null>>;
    findTable(
        count: string,
        page: string,
        sortBy: string,
        sortOrder: string
    ): Promise<ResponseFormatInterface<TagTableModel[] | null>>;
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

    @Get("rssi-by-tag/:tag")
    public async findRSSIByTag(@Param("tag") tag: string): Promise<ResponseFormatInterface<number | null>> {
        try {
            this.loggerService.log("Find RSSI By Tag");

            const response: ResponseFormatInterface<number> = formatResponse<number>(
                true,
                200,
                `RSSI By Tag ${tag} Found`,
                await this.modelService.findRSSIByTag(tag)
            );

            return response;
        } catch (error) {
            this.loggerService.error(`Find RSSI By Tag: ${error.message}`);

            return formatResponse<null>(false, 500, error.message, null);
        }
    }

    @Get("table")
    public async findTable(
        @Query("count") count: string = "0",
        @Query("page") page: string = "0",
        @Query("sortBy") sortBy: string = "id",
        @Query("sortOrder") sortOrder: string = "asc"
    ): Promise<ResponseFormatInterface<TagTableModel[] | null>> {
        try {
            this.loggerService.log("Find Table");

            const response: ResponseFormatInterface<TagTableModel[]> = formatResponse<TagTableModel[]>(
                true,
                200,
                "Table Found",
                await this.modelService.findTable(parseInt(count), parseInt(page), sortBy, sortOrder)
            );

            return response;
        } catch (error) {
            this.loggerService.error(`Find Table: ${error.message}`);

            return formatResponse<null>(false, 500, error.message, null);
        }
    }
}
