/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `pessoas` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `pessoas` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[matricula]` on the table `pessoas` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `pessoas` MODIFY `cpf` VARCHAR(11) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `pessoas_cpf_key` ON `pessoas`(`cpf`);

-- CreateIndex
CREATE UNIQUE INDEX `pessoas_email_key` ON `pessoas`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `pessoas_matricula_key` ON `pessoas`(`matricula`);
