/*
  Warnings:

  - You are about to drop the column `attemptId` on the `Frequency` table. All the data in the column will be lost.
  - You are about to drop the `Attempt` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tagId` to the `Frequency` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Frequency" DROP CONSTRAINT "Frequency_attemptId_fkey";

-- AlterTable
ALTER TABLE "Frequency" DROP COLUMN "attemptId",
ADD COLUMN     "tagId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Attempt";

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "tag" BYTEA NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Frequency" ADD CONSTRAINT "Frequency_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
