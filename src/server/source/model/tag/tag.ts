import { Prisma } from "@prisma/client";

import { IsArray, IsDate, IsNumber, IsOptional } from "class-validator";

export class TagModel implements Prisma.TagCreateInput {
    @IsNumber()
    id: number;

    @IsNumber()
    readerConfigurationId: number;

    tag: Buffer;

    @IsDate()
    createdAt: Date;

    @IsOptional()
    readerConfiguration?: Prisma.ReaderConfigurationCreateNestedOneWithoutTagInput | undefined;

    @IsOptional()
    @IsArray()
    frequencyConfiguration?: Prisma.FrequencyConfigurationCreateNestedManyWithoutTagInput | undefined;

    @IsOptional()
    @IsArray()
    frequency?: Prisma.FrequencyCreateNestedManyWithoutTagInput | undefined;
}

export class TagCreateDTO {}

export class TagUpdateDTO {}
