import { PrismaClient, ActiveReaderConfiguration, ReaderConfiguration, FrequencyConfiguration } from "@prisma/client";

const prisma: PrismaClient = new PrismaClient();
async function main(): Promise<void> {
    const readerConfiguration: ReaderConfiguration & { frequencyConfiguration: FrequencyConfiguration[] } =
        await prisma.readerConfiguration.create({
            data: {
                name: "Default",
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

    const activeReaderConfiguration: ActiveReaderConfiguration = await prisma.activeReaderConfiguration.create({
        data: {
            readerConfigurationId: readerConfiguration.id,
        },
    });

    console.log(JSON.stringify({ readerConfiguration, activeReaderConfiguration }, null, 4));
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
