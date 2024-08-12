export interface ReaderConfigurationModel {
    id: number;
    name: string;
    rssiScanCount: number;
    rssiScanInterval: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface ReaderConfigurationTableModel {
    id: number;
    name: string;
    rssiScanCount: number;
    rssiScanInterval: number;
    createdAt: Date;
    updatedAt: Date;
    frequencyConfigurationCount: number;
}

