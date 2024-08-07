import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";

import { Server, Socket } from "socket.io";

import { LoggerService } from "./logger.service";

import { TagDetailedModel } from "./../model/tag/tag";

@WebSocketGateway()
export class SocketGateway {
    private readonly loggerService: LoggerService = new LoggerService(SocketGateway.name);

    @WebSocketServer()
    server: Server;

    @SubscribeMessage("subscribeTag")
    handleTag(@MessageBody() data: { id: number }, @ConnectedSocket() client: Socket): void {
        this.loggerService.log(`Client ${client.id} subscribed to tag ${data.id}`);

        client.join(`tag-${data.id}`);
    }

    sendTag(tag: TagDetailedModel): void {
        this.loggerService.log(`Sending tag ${tag.id}`);

        this.server.to(`tag-${tag.id}`).emit("tag", tag);
    }
}
