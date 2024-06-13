import { Module } from "@nestjs/common";

import { PrismaService } from "../../provider/prisma.service";
import { SocketGateway } from "../../provider/socket.gateway";

import { AttemptController } from "./attempt.controller";
import { AttemptService } from "./attempt.service";

@Module({
    controllers: [AttemptController],
    providers: [PrismaService, SocketGateway, AttemptService],
})
export class AttemptModule {}
