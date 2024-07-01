import { Module } from "@nestjs/common";

import { PrismaService } from "../../provider/prisma.service";
import { SocketGateway } from "../../provider/socket.gateway";

import { FrequencyController } from "./frequency.controller";
import { FrequencyService } from "./frequency.service";

@Module({
    controllers: [FrequencyController],
    providers: [PrismaService, SocketGateway, FrequencyService],
})
export class FrequencyModule {}
