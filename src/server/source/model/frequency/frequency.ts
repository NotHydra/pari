import { Prisma } from "@prisma/client";

import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

import { RSSIModel } from "../rssi/rssi";

export class FrequencyModel implements Prisma.FrequencyCreateInput {
    @IsNumber()
    id: number;

    @IsNumber()
    tagId: number;

    @IsString()
    frequency: string;

    // @IsOptional()
    // tag?: Prisma.TagCreateNestedOneWithoutFrequencyInput | undefined;

    // @IsOptional()
    // @IsArray()
    // rssi?: Prisma.RSSICreateNestedManyWithoutFrequencyInput | undefined;
}

export class FrequencyDetailedModel extends FrequencyModel {
    rssi: RSSIModel[];
}

export class FrequencyCreateDTO {
    @IsNumber()
    tagId: number;

    @IsString()
    frequency: string;
}

export class FrequencyUpdateDTO {}
