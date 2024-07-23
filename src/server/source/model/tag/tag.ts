import { Prisma } from "@prisma/client";

import { IsDate, IsNumber, IsOptional } from "class-validator";

import { FrequencyDetailedModel } from "./../frequency/frequency";

export class TagModel implements Prisma.TagCreateInput {
    @IsNumber()
    id: number;

    @IsNumber()
    readerConfigurationId: number;

    @IsOptional()
    tag?: string;

    @IsDate()
    createdAt: Date;
}

export class TagDetailedModel extends TagModel {
    frequency: FrequencyDetailedModel[];
}

export class TagCreateDTO {}

export class TagUpdateDTO {
    tag: string;
}
