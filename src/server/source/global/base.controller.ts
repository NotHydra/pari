import {
    BadRequestException,
    Body,
    Delete,
    Get,
    NotFoundException,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query,
} from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { ResponseFormatInterface } from "./../common/interface/response-format.interface";
import { formatResponse } from "./../common/interceptor/response-format.interceptor";

import { LoggerService } from "./../provider/logger.service";

import { BaseService } from "./base.service";

export class BaseController<
    ModelType,
    ModelCreateDTO,
    ModelUpdateDTO,
    ModelService extends BaseService<ModelType, ModelCreateDTO, ModelUpdateDTO>,
> {
    protected readonly loggerService: LoggerService;

    constructor(
        controllerName: string,
        protected readonly modelService: ModelService
    ) {
        this.loggerService = new LoggerService(controllerName);
    }

    @Get()
    public async find(
        @Query("count") count: string = "0",
        @Query("page") page: string = "0",
        @Query("sortBy") sortBy: string = "id",
        @Query("sortOrder") sortOrder: string = "asc"
    ): Promise<ResponseFormatInterface<ModelType[] | null>> {
        try {
            this.loggerService.log("Find");

            const response: ResponseFormatInterface<ModelType[]> = formatResponse<ModelType[]>(
                true,
                200,
                "Found",
                await this.modelService.find(parseInt(count), parseInt(page), sortBy, sortOrder)
            );

            return response;
        } catch (error) {
            this.loggerService.error(`Find: ${error.message}`);

            return formatResponse<null>(false, 500, error.message, null);
        }
    }

    @Get("id/:id")
    public async findId(@Param("id", ParseIntPipe) id: number): Promise<ResponseFormatInterface<ModelType | null>> {
        try {
            this.loggerService.log("Find Id");

            const response: ResponseFormatInterface<ModelType> = formatResponse<ModelType>(
                true,
                200,
                `Id ${id} Found`,
                await this.modelService.findId(id)
            );

            return response;
        } catch (error) {
            if (error instanceof NotFoundException) {
                this.loggerService.error(`Find Id: ${error.message}`);

                return formatResponse<null>(false, 404, error.message, null);
            }

            this.loggerService.error(`Find Id: ${error.message}`);

            return formatResponse<null>(false, 500, error.message, null);
        }
    }

    @Post()
    public async add(@Body() payload: ModelCreateDTO): Promise<ResponseFormatInterface<ModelType | null>> {
        try {
            this.loggerService.log("Add");

            const response: ResponseFormatInterface<ModelType> = formatResponse<ModelType>(
                true,
                201,
                "Added",
                await this.modelService.add(payload)
            );

            return response;
        } catch (error) {
            if (error instanceof BadRequestException) {
                this.loggerService.error(`Add: ${error.message}`);

                return formatResponse<null>(false, 400, error.message, null);
            }

            this.loggerService.error(`Add: ${error.message}`);

            return formatResponse<null>(false, 500, error.message, null);
        }
    }

    @Put("id/:id")
    public async change(
        @Param("id", ParseIntPipe) id: number,
        @Body() payload: ModelUpdateDTO
    ): Promise<ResponseFormatInterface<ModelType | null>> {
        try {
            this.loggerService.log("Change");

            const response: ResponseFormatInterface<ModelType> = formatResponse<ModelType>(
                true,
                200,
                `Id ${id} Changed`,
                await this.modelService.change(id, payload)
            );

            return response;
        } catch (error) {
            if (error instanceof BadRequestException) {
                this.loggerService.error(`Change: ${error.message}`);

                return formatResponse<null>(false, 400, error.message, null);
            }

            if (error instanceof NotFoundException || error instanceof PrismaClientKnownRequestError) {
                this.loggerService.error(`Change: ${error.message}`);

                return formatResponse<null>(false, 404, error.message, null);
            }

            this.loggerService.error(`Change: ${error.message}`);

            return formatResponse<null>(false, 500, error.message, null);
        }
    }

    @Delete("id/:id")
    public async remove(@Param("id", ParseIntPipe) id: number): Promise<ResponseFormatInterface<ModelType | null>> {
        try {
            this.loggerService.log("Remove");

            const response: ResponseFormatInterface<ModelType> = formatResponse<ModelType>(
                true,
                200,
                `Id ${id} Removed`,
                await this.modelService.remove(id)
            );

            return response;
        } catch (error) {
            if (error instanceof NotFoundException || error instanceof PrismaClientKnownRequestError) {
                this.loggerService.error(`Remove: ${error.message}`);

                return formatResponse<null>(false, 404, error.message, null);
            }

            this.loggerService.error(`Remove: ${error.message}`);

            return formatResponse<null>(false, 500, error.message, null);
        }
    }
}
