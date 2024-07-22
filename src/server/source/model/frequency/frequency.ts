import { Prisma } from "@prisma/client";

import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class FrequencyModel implements Prisma.FrequencyCreateInput {
    @IsNumber()
    id: number;

    @IsNumber()
    tagId: number;

    @IsString()
    frequency: string;

    @IsOptional()
    tag?: Prisma.TagCreateNestedOneWithoutFrequencyInput | undefined;

    @IsOptional()
    @IsArray()
    rssi?: Prisma.RSSICreateNestedManyWithoutFrequencyInput | undefined;
}

export class FrequencyCreateDTO {
    @IsNumber()
    tagId: number;

    @IsString()
    frequency: string;
}

export class FrequencyUpdateDTO {}
