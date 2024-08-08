import { FrequencyDetailedModel } from "./frequency.interface";

export interface TagModel {
    id: number;
    readerConfigurationId: number;
    tag?: string;
    createdAt: Date;
}

export interface TagDetailedModel extends TagModel {
    frequency: FrequencyDetailedModel[];
}

export interface TagTableModel extends TagModel {
    readerConfigurationName: string;
    rssiCount: number;
    averageRSSI: number;
}
