/*
  Warnings:

  - You are about to drop the `Frequency` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RSSI` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Frequency" DROP CONSTRAINT "Frequency_tagId_fkey";

-- DropForeignKey
ALTER TABLE "RSSI" DROP CONSTRAINT "RSSI_frequencyId_fkey";

-- DropTable
DROP TABLE "Frequency";

-- DropTable
DROP TABLE "RSSI";

-- DropTable
DROP TABLE "Tag";

-- CreateTable
CREATE TABLE "active_reader_configuration" (
    "id" SERIAL NOT NULL,
    "reader_configuration_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "active_reader_configuration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reader_configuration" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "rssi_scan_count" INTEGER NOT NULL,
    "rssi_scan_interval" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reader_configuration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "frequency_configuration" (
    "id" SERIAL NOT NULL,
    "reader_configuration_id" INTEGER NOT NULL,
    "frequency" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "frequency_configuration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tag" (
    "id" SERIAL NOT NULL,
    "reader_configuration_id" INTEGER NOT NULL,
    "tag" BYTEA NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "frequency" (
    "id" SERIAL NOT NULL,
    "tag_id" INTEGER NOT NULL,
    "frequency" TEXT NOT NULL,

    CONSTRAINT "frequency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rssi" (
    "id" SERIAL NOT NULL,
    "frequency_id" INTEGER NOT NULL,
    "rssi" INTEGER NOT NULL,

    CONSTRAINT "rssi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FrequencyConfigurationToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "active_reader_configuration_reader_configuration_id_key" ON "active_reader_configuration"("reader_configuration_id");

-- CreateIndex
CREATE UNIQUE INDEX "_FrequencyConfigurationToTag_AB_unique" ON "_FrequencyConfigurationToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_FrequencyConfigurationToTag_B_index" ON "_FrequencyConfigurationToTag"("B");

-- AddForeignKey
ALTER TABLE "active_reader_configuration" ADD CONSTRAINT "active_reader_configuration_reader_configuration_id_fkey" FOREIGN KEY ("reader_configuration_id") REFERENCES "reader_configuration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "frequency_configuration" ADD CONSTRAINT "frequency_configuration_reader_configuration_id_fkey" FOREIGN KEY ("reader_configuration_id") REFERENCES "reader_configuration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tag" ADD CONSTRAINT "tag_reader_configuration_id_fkey" FOREIGN KEY ("reader_configuration_id") REFERENCES "reader_configuration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "frequency" ADD CONSTRAINT "frequency_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rssi" ADD CONSTRAINT "rssi_frequency_id_fkey" FOREIGN KEY ("frequency_id") REFERENCES "frequency"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FrequencyConfigurationToTag" ADD CONSTRAINT "_FrequencyConfigurationToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "frequency_configuration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FrequencyConfigurationToTag" ADD CONSTRAINT "_FrequencyConfigurationToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
