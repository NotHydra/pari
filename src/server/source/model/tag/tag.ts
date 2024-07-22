import { Prisma } from "@prisma/client";

import { IsDate, IsNumber } from "class-validator";

import { FrequencyDetailedModel } from "./../frequency/frequency";

export class TagModel implements Prisma.TagCreateInput {
    @IsNumber()
    id: number;

    @IsNumber()
    readerConfigurationId: number;

    tag: Buffer;

    @IsDate()
    createdAt: Date;
}

export class TagDetailedModel extends TagModel {
    frquency: FrequencyDetailedModel[];
}

export class TagCreateDTO {}

export class TagUpdateDTO {}
