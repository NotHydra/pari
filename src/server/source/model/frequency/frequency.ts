import { Prisma } from "@prisma/client";

import { IsNumber, IsString } from "class-validator";

import { RSSIModel } from "./../rssi/rssi";

export class FrequencyModel implements Prisma.FrequencyCreateInput {
    @IsNumber()
    id: number;

    @IsNumber()
    tagId: number;

    @IsString()
    frequency: string;
}

export class FrequencyDetailedModel extends FrequencyModel {
    rssi: RSSIModel[];
}

export class FrequencyTableModel extends FrequencyModel {
    averageRSSI: number;
}

export class FrequencyCreateDTO {
    @IsNumber()
    tagId: number;

    @IsString()
    frequency: string;
}

export class FrequencyUpdateDTO {}
