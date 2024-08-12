import { Prisma } from "@prisma/client";

import { IsDate, IsNumber, IsOptional } from "class-validator";

import { FrequencyDetailedModel } from "./../frequency/frequency";

export class TagModel implements Prisma.TagCreateInput {
    @IsNumber()
    id: number;

    @IsNumber()
    readerConfigurationId: number;

    @IsOptional()
    tag?: string;

    @IsDate()
    createdAt: Date;
}

export class TagDetailedModel extends TagModel {
    frequency: FrequencyDetailedModel[];
}

export class TagCreateDTO {}

export class TagUpdateDTO {
    tag: string;
}

export class TagTableRawModel {
    id: number;
    tag?: string;
    created_at: Date;
    reader_configuration_name: string;
    rssi_count: number;
    average_rssi: number;
}

export class TagTableModel {
    id: number;
    tag?: string;
    createdAt: Date;
    readerConfigurationName: string;
    rssiCount: number;
    averageRSSI: number;
}
