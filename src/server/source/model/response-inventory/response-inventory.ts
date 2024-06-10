import { Prisma } from "@prisma/client";
import { IsNumber, IsString } from "class-validator";

export class ResponseInventoryModel implements Prisma.ResponseInventoryCreateInput {
    @IsString()
    rssi: string;

    @IsString()
    data: string;

    @IsNumber()
    rssiValue: number;
}

export class ResponseInventoryCreateDTO {
    @IsString()
    rssi: string;

    @IsString()
    data: string;

    @IsNumber()
    rssiValue: number;
}

export class ResponseInventoryUpdateDTO {}
