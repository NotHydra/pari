import { Prisma } from "@prisma/client";

import { IsDate, IsNumber, IsOptional } from "class-validator";

import { FrequencyDetailedModel } from "./../frequency/frequency";

export class TagModel implements Prisma.TagCreateInput {
    constructor() {
        this.id = 0;
        this.readerConfigurationId = 0;
        this.tag = "";
    }

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
    reader_configuration_name: string;
    rssi_count: number;
    average_rssi: number;
    created_at: Date;
}

export class TagTableModel {
    id: number;
    tag?: string;
    readerConfigurationName: string;
    rssiCount: number;
    averageRSSI: number;
    createdAt: Date;
}
