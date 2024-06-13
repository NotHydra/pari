import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { Override } from "../../common/decorator/override";

import { SocketGateway } from "../../provider/socket.gateway";
import { PrismaService } from "../../provider/prisma.service";

import { BaseService } from "../../global/base.service";

import { RSSIModel, RSSICreateDTO, RSSIUpdateDTO } from "./rssi";

interface RSSIServiceInterface {}

@Injectable()
export class RSSIService extends BaseService<RSSIModel, RSSICreateDTO, RSSIUpdateDTO> implements RSSIServiceInterface {
    private readonly prismaService: PrismaService;

    constructor(
        prismaService: PrismaService,
        private readonly socketGateway: SocketGateway
    ) {
        super(RSSIService.name, prismaService.rSSI);

        this.prismaService = prismaService;
    }

    @Override
    public async add(payload: RSSICreateDTO): Promise<RSSIModel> {
        try {
            const model: RSSIModel = await this.prismaModel.create({ data: payload });

            this.socketGateway.handleAttemptLatest(
                await this.prismaService.attempt.findFirst({ orderBy: { createdAt: "desc" } })
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
