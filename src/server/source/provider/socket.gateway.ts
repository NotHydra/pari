import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Attempt } from "@prisma/client";
import { Server } from "socket.io";

@WebSocketGateway()
export class SocketGateway {
    @WebSocketServer()
    server: Server;

    @SubscribeMessage("attemptLatest")
    handleAttemptLatest(@MessageBody() attempt: Attempt): void {
        console.log(attempt);

        this.server.emit("attemptLatest", attempt);
    }
}
