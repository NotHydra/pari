import { Injectable } from "@nestjs/common";

import { BaseService } from "source/global/base.service";
import { PrismaService } from "../../provider/prisma.service";

import { RSSIModel, RSSICreateDTO, RSSIUpdateDTO } from "./rssi";

interface RSSIServiceInterface {}

@Injectable()
export class RSSIService extends BaseService<RSSIModel, RSSICreateDTO, RSSIUpdateDTO> implements RSSIServiceInterface {
    constructor(prismaService: PrismaService) {
        super(RSSIService.name, prismaService.rSSI);
    }
}
