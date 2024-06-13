/*
  Warnings:

  - You are about to drop the column `id_attempt` on the `Frequency` table. All the data in the column will be lost.
  - You are about to drop the column `id_frequency` on the `RSSI` table. All the data in the column will be lost.
  - Added the required column `attemptId` to the `Frequency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `frequencyId` to the `RSSI` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Frequency" DROP CONSTRAINT "Frequency_id_attempt_fkey";

-- DropForeignKey
ALTER TABLE "RSSI" DROP CONSTRAINT "RSSI_id_frequency_fkey";

-- AlterTable
ALTER TABLE "Frequency" DROP COLUMN "id_attempt",
ADD COLUMN     "attemptId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "RSSI" DROP COLUMN "id_frequency",
ADD COLUMN     "frequencyId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Frequency" ADD CONSTRAINT "Frequency_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "Attempt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RSSI" ADD CONSTRAINT "RSSI_frequencyId_fkey" FOREIGN KEY ("frequencyId") REFERENCES "Frequency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
