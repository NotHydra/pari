import { Module } from "@nestjs/common";

import { PrismaService } from "../../provider/prisma.service";

import { FrequencyController } from "./frequency.controller";
import { FrequencyService } from "./frequency.service";
import { SocketGateway } from "source/provider/socket.gateway";

@Module({
    controllers: [FrequencyController],
    providers: [PrismaService, SocketGateway, FrequencyService],
})
export class FrequencyModule {}
