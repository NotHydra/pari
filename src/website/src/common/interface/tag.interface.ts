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

export interface TagTableModel {
    id: number;
    tag?: string;
    createdAt: Date;
    readerConfigurationName: string;
    rssiCount: number;
    averageRSSI: number;
}
