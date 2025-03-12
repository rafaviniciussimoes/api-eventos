/*
  Warnings:

  - You are about to alter the column `preco` on the `eventos` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "eventos" ALTER COLUMN "preco" SET DATA TYPE INTEGER;
