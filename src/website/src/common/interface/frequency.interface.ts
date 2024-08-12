import { RSSIModel } from "./rssi.interface";

export interface FrequencyModel {
    id: number;
    tagId: number;
    frequency: string;
}

export interface FrequencyDetailedModel extends FrequencyModel {
    rssi: RSSIModel[];
}

export interface FrequencyTableModel {
    id: number;
    frequency: string;
    rssiCount: number;
    averageRSSI: number;
}
