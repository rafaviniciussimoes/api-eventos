/*
  Warnings:

  - You are about to drop the column `role` on the `administradores` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `usuarios` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "administradores" DROP COLUMN "role";

-- AlterTable
ALTER TABLE "usuarios" DROP COLUMN "role";
