import { Module } from "@nestjs/common";

import { PrismaService } from "../../provider/prisma.service";

import { RSSIController } from "./rssi.controller";
import { RSSIService } from "./rssi.service";
import { SocketGateway } from "source/provider/socket.gateway";

@Module({
    controllers: [RSSIController],
    providers: [PrismaService, SocketGateway, RSSIService],
})
export class RSSIModule {}
