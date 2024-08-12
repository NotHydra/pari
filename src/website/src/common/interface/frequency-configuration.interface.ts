export interface FrequencyConfigurationModel {
    id: number;
    readerConfigurationId: number;
    frequency: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface FrequencyConfigurationTableModel {
    id: number;
    frequency: string;
    createdAt: Date;
    updatedAt: Date;
}
