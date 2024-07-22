import { Prisma } from "@prisma/client";

import { IsNumber, IsString, IsDate } from "class-validator";

import { FrequencyConfigurationModel } from "./../frequency-configuration/frequency-configuration";

export class ReaderConfigurationModel implements Prisma.ReaderConfigurationCreateInput {
    @IsNumber()
    id: number;

    @IsString()
    name: string;

    @IsNumber()
    rssiScanCount: number;

    @IsNumber()
    rssiScanInterval: number;

    @IsDate()
    createdAt: Date;

    @IsDate()
    updatedAt: Date;
}

export class ReaderConfigurationDetailedModel extends ReaderConfigurationModel {
    frequencyConfiguration: FrequencyConfigurationModel[];
}

export class ReaderConfigurationCreateDTO {
    @IsString()
    name: string;

    @IsNumber()
    rssiScanCount: number;

    @IsNumber()
    rssiScanInterval: number;
}

export class ReaderConfigurationUpdateDTO {
    @IsString()
    name: string;

    @IsNumber()
    rssiScanCount: number;

    @IsNumber()
    rssiScanInterval: number;
}
