/*
  Warnings:

  - You are about to drop the column `sex` on the `Appointment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "sex",
ADD COLUMN     "gender" "Gender" NOT NULL DEFAULT 'MALE';
