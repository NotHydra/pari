import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

import { AttemptModel } from "source/model/attempt/attempt";

@WebSocketGateway()
export class SocketGateway {
    @WebSocketServer()
    server: Server;

    @SubscribeMessage("attemptLatest")
    handleAttemptLatest(@MessageBody() attempt: AttemptModel): void {
        console.log(attempt);

        this.server.emit("attemptLatest", attempt);
    }
}
