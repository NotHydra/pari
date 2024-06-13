import { Module } from "@nestjs/common";

import { PrismaService } from "../../provider/prisma.service";

import { AttemptController } from "./attempt.controller";
import { AttemptService } from "./attempt.service";
import { SocketGateway } from "source/provider/socket.gateway";

@Module({
    controllers: [AttemptController],
    providers: [PrismaService, SocketGateway, AttemptService],
})
export class AttemptModule {}
