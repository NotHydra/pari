import { Prisma } from "@prisma/client";

import { IsNumber, IsString, IsDate } from "class-validator";

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
}

export class FrequencyConfigurationCreateDTO {
    @IsNumber()
    readerConfigurationId: number;

    @IsString()
    frequency: string;
}

export class FrequencyConfigurationUpdateDTO {
    @IsString()
    frequency: string;
}
