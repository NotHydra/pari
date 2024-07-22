import { Prisma } from "@prisma/client";

import { IsNumber, IsString, IsDate, IsOptional, IsArray } from "class-validator";

export class FrequencyConfigurationModel implements Prisma.FrequencyConfigurationCreateInput {
    @IsNumber()
    id: number;

    @IsNumber()
    readerConfigurationId: number;

    @IsString()
    frequency: string;

    @IsDate()
    createdAt: Date;

    @IsDate()
    updatedAt: Date;

    @IsOptional()
    readerConfiguration?: Prisma.ReaderConfigurationCreateNestedOneWithoutFrequencyConfigurationInput | undefined;

    @IsOptional()
    @IsArray()
    tag?: Prisma.TagCreateNestedManyWithoutFrequencyConfigurationInput | undefined;
}

export class FrequencyConfigurationCreateDTO {
    @IsString()
    frequency: string;
}

export class FrequencyConfigurationUpdateDTO {
    @IsString()
    frequency: string;
}
