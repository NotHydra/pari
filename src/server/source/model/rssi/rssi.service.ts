import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { Override } from "./../../common/decorator/override.decorator";

import { SocketGateway } from "./../../provider/socket.gateway";
import { PrismaService } from "./../../provider/prisma.service";

import { BaseService } from "./../../global/base.service";

import { RSSIModel, RSSICreateDTO, RSSIUpdateDTO } from "./rssi";
import { PrismaModelInterface } from "source/common/interface/prisma-model.interface";

interface RSSIServiceInterface {}

@Injectable()
export class RSSIService extends BaseService<RSSIModel, RSSICreateDTO, RSSIUpdateDTO> implements RSSIServiceInterface {
    private readonly prismaService: PrismaService;

    constructor(
        prismaService: PrismaService,
        private readonly socketGateway: SocketGateway
    ) {
        super(RSSIService.name, prismaService.rSSI as unknown as PrismaModelInterface<RSSIModel>);

        this.prismaService = prismaService;
    }

    @Override
    public async add(payload: RSSICreateDTO): Promise<RSSIModel> {
        try {
            const model: RSSIModel = await this.prismaModel.create({ data: payload });

            this.socketGateway.handleTagLatest(
                await this.prismaService.tag.findFirst({
                    orderBy: { createdAt: "desc" },
                    include: {
                        frequency: { include: { rssi: true } },
                    },
                })
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
