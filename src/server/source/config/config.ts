import { LogLevel } from "@nestjs/common";

export default (): {
    logLevel: LogLevel[];
    port: number;
    databaseURL: string;
} => {
    if (process.env.LOG_LEVEL === undefined) {
        throw new Error("LOG_LEVEL is not defined");
    }

    if (process.env.PORT === undefined) {
        throw new Error("PORT is not defined");
    }

    if (process.env.DATABASE_URL === undefined) {
        throw new Error("DATABASE_URL is not defined");
    }

    const logLevel: string[] = process.env.LOG_LEVEL.split(", ").filter((level: string) => {
        return ["all", "log", "warn", "error", "debug"].includes(level);
    });

    return {
        logLevel: (logLevel && logLevel.length > 0 && logLevel[0] !== "all"
            ? logLevel
            : ["log", "warn", "error", "debug"]) as LogLevel[],
        port: parseInt(process.env.PORT) || 3001,
        databaseURL: process.env.DATABASE_URL,
    };
};
