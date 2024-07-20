import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function main(): Promise<void> {}

main()
    .then(async (): Promise<void> => {
        await prisma.$disconnect();
    })
    .catch(async (e: Error): Promise<void> => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
