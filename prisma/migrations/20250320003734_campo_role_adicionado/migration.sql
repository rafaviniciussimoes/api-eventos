-- AlterTable
ALTER TABLE "administradores" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'ADMIN';

-- AlterTable
ALTER TABLE "usuarios" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'USER';
