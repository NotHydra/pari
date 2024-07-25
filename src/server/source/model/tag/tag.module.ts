import { Module } from "@nestjs/common";

import { PrismaService } from "./../../provider/prisma.service";
import { SocketGateway } from "./../../provider/socket.gateway";

import { TagController } from "./tag.controller";
import { TagService } from "./tag.service";

@Module({
    controllers: [TagController],
    providers: [PrismaService, SocketGateway, TagService],
})
export class TagModule {}
