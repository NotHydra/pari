/*
  Warnings:

  - You are about to drop the `ResponseInventory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ResponseInventory";

-- CreateTable
CREATE TABLE "Attempt" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Attempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Frequency" (
    "id" SERIAL NOT NULL,
    "id_attempt" INTEGER NOT NULL,
    "frequency" TEXT NOT NULL,

    CONSTRAINT "Frequency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RSSI" (
    "id" SERIAL NOT NULL,
    "id_frequency" INTEGER NOT NULL,
    "rssi" INTEGER NOT NULL,

    CONSTRAINT "RSSI_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Frequency" ADD CONSTRAINT "Frequency_id_attempt_fkey" FOREIGN KEY ("id_attempt") REFERENCES "Attempt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RSSI" ADD CONSTRAINT "RSSI_id_frequency_fkey" FOREIGN KEY ("id_frequency") REFERENCES "Frequency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
