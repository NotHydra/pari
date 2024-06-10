import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

import { ResponseInventoryModel } from "../model/response-inventory/response-inventory";

@WebSocketGateway()
export class SocketGateway {
    @WebSocketServer()
    server: Server;

    @SubscribeMessage("responseInventoryLatest")
    handleResponseInventoryLatest(@MessageBody() responseInventory: ResponseInventoryModel[]): void {
        console.log(responseInventory);

        this.server.emit("responseInventoryLatest", responseInventory);
    }
}
