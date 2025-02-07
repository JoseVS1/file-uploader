/*
  Warnings:

  - A unique constraint covering the columns `[cloudinary_id]` on the table `File` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cloudinary_id` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "File" ADD COLUMN     "cloudinary_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "File_cloudinary_id_key" ON "File"("cloudinary_id");
