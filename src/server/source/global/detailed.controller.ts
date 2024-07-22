import { Get, NotFoundException, Param, ParseIntPipe, Query } from "@nestjs/common";

import { ResponseFormatInterface } from "./../common/interface/response-format.interface";
import { formatResponse } from "./../common/interceptor/response-format.interceptor";

import { BaseController } from "./base.controller";
import { DetailedService } from "./detailed.service";

export class DetailedController<
    ModelType,
    ModelDetailedType extends ModelType,
    ModelCreateDTO,
    ModelUpdateDTO,
    ModelService extends DetailedService<ModelType, ModelDetailedType, ModelCreateDTO, ModelUpdateDTO>,
> extends BaseController<ModelType, ModelCreateDTO, ModelUpdateDTO, ModelService> {
    constructor(controllerName: string, modelService: ModelService) {
        super(controllerName, modelService);
    }

    @Get("detailed")
    public async findDetailed(
        @Query("page") page: string = "0",
        @Query("count") count: string = "0"
    ): Promise<ResponseFormatInterface<ModelDetailedType[]>> {
        try {
            const response: ResponseFormatInterface<ModelDetailedType[]> = formatResponse<ModelDetailedType[]>(
                true,
                200,
                "Detailed Found",
                await this.modelService.findDetailed(parseInt(page), parseInt(count))
            );

            this.loggerService.log(`Find Detailed: ${JSON.stringify(response)}`);

            return response;
        } catch (error) {
            this.loggerService.error(`Find Detailed: ${error.message}`);

            return formatResponse<null>(false, 500, error.message, null);
        }
    }

    @Get("id/:id/detailed")
    public async findIdDetailed(
        @Param("id", ParseIntPipe) id: number
    ): Promise<ResponseFormatInterface<ModelDetailedType>> {
        try {
            const response: ResponseFormatInterface<ModelDetailedType> = formatResponse<ModelDetailedType>(
                true,
                200,
                `Detailed Id ${id} Found`,
                await this.modelService.findIdDetailed(id)
            );

            this.loggerService.log(`Find Id Detailed: ${JSON.stringify(response)}`);

            return response;
        } catch (error) {
            if (error instanceof NotFoundException) {
                this.loggerService.error(`Find Id Detailed: ${error.message}`);

                return formatResponse<null>(false, 404, error.message, null);
            }

            this.loggerService.error(`Find Id Detailed: ${error.message}`);

            return formatResponse<null>(false, 500, error.message, null);
        }
    }
}
