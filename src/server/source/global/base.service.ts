import { BadRequestException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { PrismaModelInterface } from "./../common/interface/prisma-model.interface";

import { LoggerService } from "./../provider/logger.service";

interface QueryOptionInterface {
    take?: number;
    skip?: number;
    orderBy?: {
        [key: string]: "asc" | "desc";
    };
    where?: {
        OR: { [key: string]: { equals: number } | { contains: string } }[];
    };
}

interface SearchFieldInterface {
    property: string;
    type: string;
}

export class BaseService<ModelType, ModelCreateDTO, ModelUpdateDTO> {
    protected readonly loggerService: LoggerService;
    protected readonly searchField: SearchFieldInterface[];

    public constructor(
        serviceName: string,
        protected readonly baseModel: { new (): ModelType },
        protected readonly prismaModel: PrismaModelInterface<ModelType>
    ) {
        this.loggerService = new LoggerService(serviceName);

        const instance: ModelType = new baseModel();
        this.searchField = Object.getOwnPropertyNames(instance).map((property: string) => {
            return { property: property, type: Reflect.getMetadata("design:type", instance as any, property).name };
        });
    }

    protected queryOption(
        count: number,
        page: number,
        search: string,
        sortBy: string,
        sortOrder: string
    ): QueryOptionInterface {
        const queryOption: QueryOptionInterface = {};

        if (count !== 0) {
            queryOption.take = count;
        }

        if (page !== 0 && count !== 0) {
            queryOption.skip = (page - 1) * count;
        }

        if (search !== "") {
            queryOption.where = {
                OR: this.searchField.map(
                    (field: SearchFieldInterface): { [key: string]: { contains: string } | { equals: number } } => {
                        return field.type === "Number"
                            ? { [field.property]: { equals: parseInt(search) } }
                            : { [field.property]: { contains: search } };
                    }
                ),
            };
        }

        queryOption.orderBy = {
            [sortBy]: sortOrder === "desc" ? "desc" : "asc",
        };

        return queryOption;
    }

    public async find(
        count: number = 0,
        page: number = 0,
        search: string = "",
        sortBy: string = "id",
        sortOrder: string = "asc"
    ): Promise<ModelType[]> {
        try {
            this.loggerService.log("Find");
            this.loggerService.debug(`Find Argument: ${JSON.stringify({ count, page, search, sortBy, sortOrder })}`);

            const models: ModelType[] = await this.prismaModel.findMany(
                this.queryOption(count, page, search, sortBy, sortOrder)
            );

            this.loggerService.debug(`Find Result: ${JSON.stringify(models)}`);

            return models;
        } catch (error) {
            this.loggerService.error(`Find: ${error.message}`);

            throw new InternalServerErrorException("Internal Server Error");
        }
    }

    public async findId(id: number): Promise<ModelType> {
        try {
            this.loggerService.log("Find Id");
            this.loggerService.debug(`Find Id Argument: ${JSON.stringify({ id })}`);

            const model: ModelType = await this.prismaModel.findUnique({ where: { id } });

            if (!model) {
                throw new NotFoundException(`Id ${id} Not Found`);
            }

            this.loggerService.debug(`Find Id Result: ${JSON.stringify(model)}`);

            return model;
        } catch (error) {
            if (error instanceof NotFoundException) {
                this.loggerService.error(`Find Id: ${error.message}`);

                throw error;
            }

            this.loggerService.error(`Find Id: ${error.message}`);

            throw new InternalServerErrorException("Internal Server Error");
        }
    }

    public async add(payload: ModelCreateDTO): Promise<ModelType> {
        try {
            this.loggerService.log("Add");
            this.loggerService.debug(`Add Argument: ${JSON.stringify(payload)}`);

            const model: ModelType = await this.prismaModel.create({ data: payload });

            this.loggerService.debug(`Add Result: ${JSON.stringify(model)}`);

            return model;
        } catch (error) {
            if (error instanceof BadRequestException) {
                this.loggerService.error(`Add: ${error.message}`);

                throw error;
            }

            if (error instanceof PrismaClientKnownRequestError) {
                this.loggerService.error("Add: Invalid Payload");

                throw new BadRequestException("Invalid Payload");
            }

            this.loggerService.error(`Add: ${error.message}`);

            throw new InternalServerErrorException("Internal Server Error");
        }
    }

    public async change(id: number, payload: ModelUpdateDTO): Promise<ModelType> {
        try {
            this.loggerService.log("Change");
            this.loggerService.debug(`Change Argument: ${JSON.stringify({ id, payload })}`);

            const model: ModelType = await this.prismaModel.update({
                where: { id },
                data: payload,
            });

            if (!model) {
                throw new NotFoundException(`Id ${id} Not Found`);
            }

            this.loggerService.debug(`Change Result: ${JSON.stringify(model)}`);

            return model;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                this.loggerService.error(`Change: Id ${id} Not Found`);

                throw new NotFoundException(`Id ${id} Not Found`);
            }

            if (error instanceof NotFoundException) {
                this.loggerService.error(`Change: ${error.message}`);

                throw error;
            }

            this.loggerService.error(`Change: ${error.message}`);

            throw new InternalServerErrorException("Internal Server Error");
        }
    }

    public async remove(id: number): Promise<ModelType> {
        try {
            this.loggerService.log("Remove");
            this.loggerService.debug(`Remove Argument: ${JSON.stringify({ id })}`);

            const model: ModelType = await this.prismaModel.delete({ where: { id } });

            if (!model) {
                throw new NotFoundException(`Id ${id} Not Found`);
            }

            this.loggerService.debug(`Remove Result: ${JSON.stringify(model)}`);

            return model;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                this.loggerService.error(`Remove: Id ${id} Not Found`);

                throw new NotFoundException(`Id ${id} Not Found`);
            }

            if (error instanceof NotFoundException) {
                this.loggerService.error(`Remove: ${error.message}`);

                throw error;
            }

            this.loggerService.error(`Remove: ${error.message}`);

            throw new InternalServerErrorException("Internal Server Error");
        }
    }
}
