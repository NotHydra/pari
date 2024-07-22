import { Injectable, LogLevel } from "@nestjs/common";
import { ConfigService as NestConfigService } from "@nestjs/config";

@Injectable()
export class ConfigService {
    constructor(private readonly nestConfigService: NestConfigService) {}

    public getLogLevel(): LogLevel[] {
        const logLevel: LogLevel[] | undefined = this.nestConfigService.get<LogLevel[]>("logLevel");

        if (logLevel === undefined) {
            throw new Error("LOG_LEVEL is not defined");
        }

        return logLevel;
    }

    public getPort(): number {
        const port: number | undefined = this.nestConfigService.get<number>("port");

        if (port === undefined) {
            throw new Error("PORT is not defined");
        }

        return port;
    }

    public getDatabaseURL(): string {
        const databaseURL: string | undefined = this.nestConfigService.get<string>("databaseURL");

        if (databaseURL === undefined) {
            throw new Error("DATABASE_URL is not defined");
        }

        return databaseURL;
    }
}
