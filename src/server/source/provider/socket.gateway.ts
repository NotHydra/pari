import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Tag } from "@prisma/client";

import { Server } from "socket.io";

@WebSocketGateway()
export class SocketGateway {
    @WebSocketServer()
    server: Server;

    @SubscribeMessage("tagLatest")
    handleTagLatest(@MessageBody() tag: Tag | null): void {
        console.log(tag);

        this.server.emit("tagLatest", tag);
    }
}
