import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { Override } from "../../common/decorator/override";
import { BaseService } from "../../global/base.service";
import { PrismaService } from "../../provider/prisma.service";
import { SocketGateway } from "../../provider/socket.gateway";

import { ResponseInventoryCreateDTO, ResponseInventoryModel, ResponseInventoryUpdateDTO } from "./response-inventory";

interface ResponseInventoryServiceInterface {}

@Injectable()
export class ResponseInventoryService
    extends BaseService<ResponseInventoryModel, ResponseInventoryCreateDTO, ResponseInventoryUpdateDTO>
    implements ResponseInventoryServiceInterface
{
    constructor(
        prismaService: PrismaService,
        private readonly socketGateway: SocketGateway
    ) {
        super(ResponseInventoryService.name, prismaService.responseInventory);
    }

    public async findLatest(): Promise<ResponseInventoryModel[]> {
        try {
            return await this.prismaModel.findMany({ take: 5, orderBy: { createdAt: "desc" } });
        } catch (error) {
            this.loggerService.error(`Latest: ${error.message}`);
            throw new InternalServerErrorException("Internal Server Error");
        }
    }

    @Override
    public async add(payload: ResponseInventoryCreateDTO): Promise<ResponseInventoryModel> {
        try {
            const model: ResponseInventoryModel = await this.prismaModel.create({ data: payload });

            this.socketGateway.handleResponseInventoryLatest(
                await this.prismaModel.findMany({ take: 5, orderBy: { createdAt: "desc" } })
            );

            this.loggerService.log(`Add: ${JSON.stringify(model)}`);

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
}
