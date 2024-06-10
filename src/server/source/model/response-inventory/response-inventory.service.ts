import { Injectable } from "@nestjs/common";

import { BaseService } from "../../global/base.service";
import { PrismaService } from "../../provider/prisma.service";

import { ResponseInventoryCreateDTO, ResponseInventoryModel, ResponseInventoryUpdateDTO } from "./response-inventory";

interface ResponseInventoryServiceInterface {}

@Injectable()
export class ResponseInventoryService
    extends BaseService<ResponseInventoryModel, ResponseInventoryCreateDTO, ResponseInventoryUpdateDTO>
    implements ResponseInventoryServiceInterface
{
    constructor(prismaService: PrismaService) {
        super(ResponseInventoryService.name, prismaService.responseInventory);
    }
}
