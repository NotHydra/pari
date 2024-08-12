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

export class ReaderConfigurationTableRawModel {
    id: number;
    name: string;
    frequency_configuration_count: number;
    rssi_scan_count: number;
    rssi_scan_interval: number;
    created_at: Date;
    updated_at: Date;
}

export class ReaderConfigurationTableModel {
    id: number;
    name: string;
    frequencyConfigurationCount: number;
    rssiScanCount: number;
    rssiScanInterval: number;
    createdAt: Date;
    updatedAt: Date;
}
