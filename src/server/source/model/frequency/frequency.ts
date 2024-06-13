import { Prisma } from "@prisma/client";
import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class FrequencyModel implements Prisma.FrequencyCreateInput {
    @IsNumber()
    id: number;

    @IsNumber()
    attemptId: number;

    @IsOptional()
    attempt?: Prisma.AttemptCreateNestedOneWithoutFrequencyInput | undefined;

    @IsString()
    frequency: string;

    @IsOptional()
    @IsArray()
    rssi?: Prisma.RSSICreateNestedManyWithoutFrequencyInput | undefined;
}

export class FrequencyCreateDTO {
    @IsNumber()
    attemptId: number;

    @IsString()
    frequency: string;
}

export class FrequencyUpdateDTO {}
