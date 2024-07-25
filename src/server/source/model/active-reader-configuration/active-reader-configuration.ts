import { Prisma } from "@prisma/client";

import { IsNumber, IsDate } from "class-validator";

import { ReaderConfigurationDetailedModel } from "./../reader-configuration/reader-configuration";

export class ActiveReaderConfigurationModel implements Prisma.ActiveReaderConfigurationCreateInput {
    @IsNumber()
    id: number;

    @IsNumber()
    readerConfigurationId: number;

    @IsDate()
    createdAt: Date;

    @IsDate()
    updatedAt: Date;
}

export class ActiveReaderConfigurationDetailedModel extends ActiveReaderConfigurationModel {
    readerConfiguration: ReaderConfigurationDetailedModel;
}

export class ActiveReaderConfigurationRawModel {
    id: number;
    name: string;
    rssiScanCount: number;
    rssiScanInterval: number;
    frequencyConfiguration: string[];
}

export class ActiveReaderConfigurationCreateDTO {}

export class ActiveReaderConfigurationUpdateDTO {
    readerConfigurationId: number;
}
