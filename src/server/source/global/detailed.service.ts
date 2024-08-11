import { InternalServerErrorException, NotFoundException } from "@nestjs/common";

import { PrismaDetailedModelInterface } from "./../common/interface/prisma-model.interface";

import { BaseService } from "./base.service";

import { queryOptions } from "./../utility/query-options.utility";

interface DetailedInterface {
    [key: string]: { include: DetailedInterface } | boolean;
}

export class DetailedService<
    ModelType,
    ModelDetailedType extends ModelType,
    ModelCreateDTO,
    ModelUpdateDTO,
> extends BaseService<ModelType, ModelCreateDTO, ModelUpdateDTO> {
    protected readonly detailed: DetailedInterface;

    constructor(
        serviceName: string,
        protected readonly prismaModel: PrismaDetailedModelInterface<ModelType, ModelDetailedType>,
        detailed: DetailedInterface
    ) {
        super(serviceName, prismaModel);

        this.detailed = detailed;
    }

    public async findDetailed(
        page: number = 0,
        count: number = 0,
        sortBy: string = "id",
        sortOrder: string = "asc"
    ): Promise<ModelDetailedType[]> {
        try {
            this.loggerService.log("Find Detailed");
            this.loggerService.debug(`Find Detailed Argument: ${JSON.stringify({ page, count, sortBy, sortOrder })}`);

            const models: ModelDetailedType[] = await this.prismaModel.findMany({
                ...queryOptions(count, page, sortBy, sortOrder),
                ...{ include: this.detailed },
            });

            this.loggerService.debug(`Find Detailed Result: ${JSON.stringify(models)}`);

            return models;
        } catch (error) {
            this.loggerService.error(`Find Detailed: ${error.message}`);

            throw new InternalServerErrorException("Internal Server Error");
        }
    }

    public async findIdDetailed(id: number): Promise<ModelDetailedType> {
        try {
            this.loggerService.log("Find Id Detailed");
            this.loggerService.debug(`Find Id Detailed Argument: ${JSON.stringify({ id })}`);

            const model: ModelDetailedType = await this.prismaModel.findUnique({
                where: { id },
                include: this.detailed,
            });

            if (!model) {
                throw new NotFoundException(`Id ${id} Not Found`);
            }

            this.loggerService.debug(`Find Id Detailed Result: ${JSON.stringify(model)}`);

            return model;
        } catch (error) {
            if (error instanceof NotFoundException) {
                this.loggerService.error(`Find Id Detailed: ${error.message}`);
                throw error;
            }

            this.loggerService.error(`Find Id Detailed: ${error.message}`);

            throw new InternalServerErrorException("Internal Server Error");
        }
    }
}
