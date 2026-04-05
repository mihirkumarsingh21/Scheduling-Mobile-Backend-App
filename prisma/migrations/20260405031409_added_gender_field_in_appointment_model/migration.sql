-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "reason" TEXT,
ADD COLUMN     "sex" "Gender" NOT NULL DEFAULT 'MALE';
