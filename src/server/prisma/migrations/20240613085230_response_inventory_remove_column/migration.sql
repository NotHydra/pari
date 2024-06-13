/*
  Warnings:

  - You are about to drop the column `data` on the `ResponseInventory` table. All the data in the column will be lost.
  - You are about to drop the column `rssiValue` on the `ResponseInventory` table. All the data in the column will be lost.
  - Changed the type of `rssi` on the `ResponseInventory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ResponseInventory" DROP COLUMN "data",
DROP COLUMN "rssiValue",
DROP COLUMN "rssi",
ADD COLUMN     "rssi" INTEGER NOT NULL;
