/*
  Warnings:

  - You are about to drop the `Author` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Book` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Author" DROP CONSTRAINT "Author_bookId_fkey";

-- DropTable
DROP TABLE "Author";

-- DropTable
DROP TABLE "Book";

-- CreateTable
CREATE TABLE "ResponseInventory" (
    "id" SERIAL NOT NULL,
    "rssi" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "rssiValue" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ResponseInventory_pkey" PRIMARY KEY ("id")
);
