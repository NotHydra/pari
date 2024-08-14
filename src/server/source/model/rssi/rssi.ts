import { Prisma } from "@prisma/client";

import { IsNumber } from "class-validator";

export class RSSIModel implements Prisma.RSSICreateInput {
    constructor() {
        this.id = 0;
        this.frequencyId = 0;
        this.rssi = 0;
    }

    @IsNumber()
    id: number;

    @IsNumber()
    frequencyId: number;

    @IsNumber()
    rssi: number;
}

export class RSSICreateDTO {
    @IsNumber()
    frequencyId: number;

    @IsNumber()
    rssi: number;
}

export class RSSIUpdateDTO {}

export class RSSITableModel {
    id: number;
    rssi: number;
}
