export interface FrequencyModel {
    id: number;
    tagId: number;
    frequency: string;
}

export interface FrequencyTableModel extends FrequencyModel {
    averageRSSI: number;
}
