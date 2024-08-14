import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { Override } from "./../../common/decorator/override.decorator";
import { PrismaModelInterface } from "./../../common/interface/prisma-model.interface";

import { SocketGateway } from "./../../provider/socket.gateway";
import { PrismaService } from "./../../provider/prisma.service";

import { BaseService } from "./../../global/base.service";

import { RSSIModel, RSSICreateDTO, RSSIUpdateDTO, RSSITableModel } from "./rssi";
import { TagDetailedModel } from "../tag/tag";
import { FrequencyModel } from "../frequency/frequency";

interface RSSIServiceInterface {
    findTable(
        frequencyId: number,
        count: number,
        page: number,
        sortBy: string,
        sortOrder: string
    ): Promise<RSSITableModel[]>;
}

@Injectable()
export class RSSIService extends BaseService<RSSIModel, RSSICreateDTO, RSSIUpdateDTO> implements RSSIServiceInterface {
    private readonly prismaService: PrismaService;

    constructor(
        prismaService: PrismaService,
        private readonly socketGateway: SocketGateway
    ) {
        super(RSSIService.name, RSSIModel, prismaService.rSSI as unknown as PrismaModelInterface<RSSIModel>);

        this.prismaService = prismaService;
    }

    public async findTable(
        frequencyId: number,
        count: number = 0,
        page: number = 0,
        sortBy: string = "id",
        sortOrder: string = "asc"
    ): Promise<RSSITableModel[]> {
        try {
            this.loggerService.log("Find Table");
            this.loggerService.debug(
                `Find Table Argument: ${JSON.stringify({ frequencyId, count, page, sortBy, sortOrder })}`
            );

            const models: RSSITableModel[] = await this.prismaService.$queryRaw`
                SELECT
                    rssi.id AS "id",
                    rssi.rssi AS "rssi"

                FROM
                    rssi

                WHERE
                    rssi.frequency_id=${frequencyId}

                ORDER BY
                    ${Prisma.sql([sortBy])} ${Prisma.sql([sortOrder === "desc" ? "desc" : "asc"])}

                ${count !== 0 ? Prisma.sql([`LIMIT ${count}`]) : Prisma.sql([""])}

                ${page !== 0 ? Prisma.sql([`OFFSET ${(page - 1) * count}`]) : Prisma.sql([""])}
            `;

            this.loggerService.debug(`Find Table Result: ${JSON.stringify(models)}`);

            return models;
        } catch (error) {
            this.loggerService.error(`Find Table: ${error.message}`);

            throw new InternalServerErrorException("Internal Server Error");
        }
    }

    @Override
    public async add(payload: RSSICreateDTO): Promise<RSSIModel> {
        try {
            this.loggerService.log("Add");
            this.loggerService.debug(`Add Argument: ${JSON.stringify(payload)}`);

            const model: RSSIModel & { frequency: FrequencyModel } = (await this.prismaModel.create({
                data: payload,
                include: { frequency: true },
            })) as unknown as RSSIModel & { frequency: FrequencyModel };

            this.socketGateway.sendTag(
                (await this.prismaService.tag.findUnique({
                    where: { id: model.frequency.tagId },
                    include: { frequency: { include: { rssi: true } } },
                })) as unknown as TagDetailedModel
            );

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
}
