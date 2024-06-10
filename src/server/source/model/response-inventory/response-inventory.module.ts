import { Module } from "@nestjs/common";

import { PrismaService } from "../../provider/prisma.service";

import { ResponseInventoryController } from "./response-inventory.controller";
import { ResponseInventoryService } from "./response-inventory.service";
import { SocketGateway } from "source/provider/socket.gateway";

@Module({
    controllers: [ResponseInventoryController],
    providers: [PrismaService, SocketGateway, ResponseInventoryService],
})
export class ResponseInventoryModule {}
