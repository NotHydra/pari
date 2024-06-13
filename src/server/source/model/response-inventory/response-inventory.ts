import { Prisma } from "@prisma/client";
import { IsNumber } from "class-validator";

export class ResponseInventoryModel implements Prisma.ResponseInventoryCreateInput {
    @IsNumber()
    rssi: number;
}

export class ResponseInventoryCreateDTO {
    @IsNumber()
    rssi: number;
}

export class ResponseInventoryUpdateDTO {}
