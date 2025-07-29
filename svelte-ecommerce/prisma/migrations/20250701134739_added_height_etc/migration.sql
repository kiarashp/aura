/*
  Warnings:

  - Added the required column `depth` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `height` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `width` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "depth" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "height" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "highlights" TEXT[],
ADD COLUMN     "width" DOUBLE PRECISION NOT NULL;
