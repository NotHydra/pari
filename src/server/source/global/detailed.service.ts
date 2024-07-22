import { InternalServerErrorException, NotFoundException } from "@nestjs/common";

import { PrismaDetailedModelInterface } from "./../common/interface/prisma-model.interface";

import { BaseService } from "./base.service";

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

    public async findDetailed(page: number = 0, count: number = 0): Promise<ModelDetailedType[]> {
        try {
            const models: ModelDetailedType[] =
                page !== 0 && count !== 0
                    ? await this.prismaModel.findMany({
                          skip: (page - 1) * count,
                          take: count,
                          orderBy: {
                              id: "asc",
                          },
                          include: this.detailed,
                      })
                    : await this.prismaModel.findMany({ include: this.detailed });

            this.loggerService.log(`Find Detailed: ${JSON.stringify(models)}`);

            return models;
        } catch (error) {
            this.loggerService.error(`Find Detailed: ${error.message}`);
            throw new InternalServerErrorException("Internal Server Error");
        }
    }

    public async findIdDetailed(id: number): Promise<ModelDetailedType> {
        try {
            const model: ModelDetailedType = await this.prismaModel.findUnique({
                where: { id },
                include: this.detailed,
            });

            if (!model) {
                throw new NotFoundException(`Id ${id} Not Found`);
            }

            this.loggerService.log(`Find Id Detailed: ${JSON.stringify(model)}`);

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
