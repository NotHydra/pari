import { Prisma } from "@prisma/client";

import { IsArray, IsDate, IsNumber, IsOptional } from "class-validator";

export class TagModel implements Prisma.TagCreateInput {
    @IsNumber()
    id: number;

    tag: Buffer;

    @IsOptional()
    @IsArray()
    frequency?: Prisma.FrequencyCreateNestedManyWithoutTagInput | undefined;

    @IsDate()
    createdAt: Date;
}

export class TagCreateDTO {}

export class TagUpdateDTO {}
