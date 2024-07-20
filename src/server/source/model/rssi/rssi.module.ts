import { Module } from "@nestjs/common";

import { PrismaService } from "./../../provider/prisma.service";
import { SocketGateway } from "./../../provider/socket.gateway";

import { RSSIController } from "./rssi.controller";
import { RSSIService } from "./rssi.service";

@Module({
    controllers: [RSSIController],
    providers: [PrismaService, SocketGateway, RSSIService],
})
export class RSSIModule {}
