import { Prisma, ReaderConfiguration } from "@prisma/client";

import { IsNumber, IsDate, IsOptional } from "class-validator";

import { ReaderConfigurationDetailedModel } from "../reader-configuration/reader-configuration";

export class ActiveReaderConfigurationModel implements Prisma.ActiveReaderConfigurationCreateInput {
    @IsNumber()
    id: number;

    @IsNumber()
    readerConfigurationId: number;

    @IsDate()
    createdAt: Date;

    @IsDate()
    updatedAt: Date;

    // @IsOptional()
    // readerConfiguration?: Prisma.ReaderConfigurationCreateNestedOneWithoutActiveReaderConfigurationInput;
}

export class ActiveReaderConfigurationDetailedModel extends ActiveReaderConfigurationModel {
    readerConfiguration: ReaderConfigurationDetailedModel;
}

export class ActiveReaderConfigurationRawModel {
    id: number;
    rssiScanCount: number;
    rssiScanInterval: number;
    frequencyConfiguration: string[];
}

export class ActiveReaderConfigurationCreateDTO {}

export class ActiveReaderConfigurationUpdateDTO {}
