import { Prisma } from "@prisma/client";

import { IsNumber, IsDate } from "class-validator";

export class ActiveReaderConfigurationModel implements Prisma.ActiveReaderConfigurationCreateInput {
    @IsNumber()
    id: number;

    @IsNumber()
    readerConfigurationId: number;

    @IsDate()
    createdAt: Date;

    @IsDate()
    updatedAt: Date;

    readerConfiguration: Prisma.ReaderConfigurationCreateNestedOneWithoutActiveReaderConfigurationInput;
}

export class ActiveReaderConfigurationCreateDTO {}

export class ActiveReaderConfigurationUpdateDTO {}
