import { Module } from '@nestjs/common';
import { AlterarSenhaController } from './alterar-senha.controller';
import { AlterarSenhaService } from './alterar-senha.service';
import { EmailModule } from '../email/email.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [EmailModule, PrismaModule],
  controllers: [AlterarSenhaController],
  providers: [AlterarSenhaService],
  exports: [AlterarSenhaService]
})
export class AlterarSenhaModule {}
