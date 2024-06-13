import { Prisma } from "@prisma/client";
import { IsArray, IsDate, IsNumber, IsOptional } from "class-validator";

export class AttemptModel implements Prisma.AttemptCreateInput {
    @IsNumber()
    id: number;

    @IsOptional()
    @IsArray()
    frequency?: Prisma.FrequencyCreateNestedManyWithoutAttemptInput | undefined;

    @IsDate()
    createdAt: Date;
}

export class AttemptCreateDTO {}

export class AttemptUpdateDTO {}
