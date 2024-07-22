import { Prisma } from "@prisma/client";

import { IsNumber, IsOptional } from "class-validator";

export class RSSIModel implements Prisma.RSSICreateInput {
    @IsNumber()
    id: number;

    @IsNumber()
    frequencyId: number;

    @IsNumber()
    rssi: number;

    // @IsOptional()
    // frequency?: Prisma.FrequencyCreateNestedOneWithoutRssiInput | undefined;
}

export class RSSICreateDTO {
    @IsNumber()
    frequencyId: number;

    @IsNumber()
    rssi: number;
}

export class RSSIUpdateDTO {}
