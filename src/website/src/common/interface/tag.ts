export interface TagModel {
    id: number;
    readerConfigurationId: number;
    tag?: string;
    createdAt: Date;
}

export interface TagTableModel extends TagModel {
    readerConfigurationName: string;
    averageRSSI: number;
}
