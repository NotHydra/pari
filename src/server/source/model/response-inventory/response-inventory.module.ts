import { Module } from "@nestjs/common";

import { PrismaService } from "../../provider/prisma.service";

import { ResponseInventoryController } from "./response-inventory.controller";
import { ResponseInventoryService } from "./response-inventory.service";

@Module({
    controllers: [ResponseInventoryController],
    providers: [PrismaService, ResponseInventoryService],
})
export class ResponseInventoryModule {}
