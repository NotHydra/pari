import { PrismaClient, ActiveReaderConfiguration, ReaderConfiguration, FrequencyConfiguration } from "@prisma/client";

const prisma: PrismaClient = new PrismaClient();
async function main(): Promise<void> {
    const defaultReaderConfiguration: ReaderConfiguration & { frequencyConfiguration: FrequencyConfiguration[] } =
        await prisma.readerConfiguration.create({
            data: {
                name: "Default Scan",
                rssiScanCount: 10,
                rssiScanInterval: 100,
                frequencyConfiguration: {
                    create: [
                        { frequency: "919.5" },
                        { frequency: "920" },
                        { frequency: "920.5" },
                        { frequency: "921" },
                        { frequency: "921.5" },
                        { frequency: "922" },
                        { frequency: "922.5" },
                    ],
                },
            },
            include: {
                frequencyConfiguration: true,
            },
        });

    const quickScanReaderConfiguration: ReaderConfiguration & { frequencyConfiguration: FrequencyConfiguration[] } =
        await prisma.readerConfiguration.create({
            data: {
                name: "Quick Scan",
                rssiScanCount: 1,
                rssiScanInterval: 50,
                frequencyConfiguration: {
                    create: [
                        { frequency: "919.5" },
                        { frequency: "920" },
                        { frequency: "920.5" },
                        { frequency: "921" },
                        { frequency: "921.5" },
                        { frequency: "922" },
                        { frequency: "922.5" },
                    ],
                },
            },
            include: {
                frequencyConfiguration: true,
            },
        });

    const singleScanReaderConfiguration: ReaderConfiguration & { frequencyConfiguration: FrequencyConfiguration[] } =
        await prisma.readerConfiguration.create({
            data: {
                name: "Single Scan",
                rssiScanCount: 1,
                rssiScanInterval: 50,
                frequencyConfiguration: {
                    create: [{ frequency: "919.5" }],
                },
            },
            include: {
                frequencyConfiguration: true,
            },
        });

    const activeReaderConfiguration: ActiveReaderConfiguration = await prisma.activeReaderConfiguration.create({
        data: {
            readerConfigurationId: defaultReaderConfiguration.id,
        },
    });

    console.log(
        JSON.stringify(
            {
                readerConfiguration: [
                    defaultReaderConfiguration,
                    quickScanReaderConfiguration,
                    singleScanReaderConfiguration,
                ],
                activeReaderConfiguration,
            },
            null,
            4
        )
    );
}

main()
    .then(async (): Promise<void> => {
        await prisma.$disconnect();
    })
    .catch(async (e: Error): Promise<void> => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
