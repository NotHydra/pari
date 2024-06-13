import { Prisma } from "@prisma/client";
import { IsArray, IsNumber, IsOptional } from "class-validator";

export class RSSIModel implements Prisma.RSSICreateInput {
    @IsNumber()
    id: number;

    @IsNumber()
    frequencyId: number;

    @IsOptional()
    frequency?: Prisma.FrequencyCreateNestedOneWithoutRssiInput | undefined;

    @IsNumber()
    rssi: number;
}

export class RSSICreateDTO {
    @IsNumber()
    frequencyId: number;

    @IsNumber()
    rssi: number;
}

export class RSSIUpdateDTO {}
