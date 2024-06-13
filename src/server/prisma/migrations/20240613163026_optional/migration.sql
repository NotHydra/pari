-- DropForeignKey
ALTER TABLE "Frequency" DROP CONSTRAINT "Frequency_attemptId_fkey";

-- DropForeignKey
ALTER TABLE "RSSI" DROP CONSTRAINT "RSSI_frequencyId_fkey";

-- AddForeignKey
ALTER TABLE "Frequency" ADD CONSTRAINT "Frequency_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "Attempt"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RSSI" ADD CONSTRAINT "RSSI_frequencyId_fkey" FOREIGN KEY ("frequencyId") REFERENCES "Frequency"("id") ON DELETE CASCADE ON UPDATE CASCADE;
