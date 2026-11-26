import { Module } from '@nestjs/common';
import { CadastroUsuarioController } from './cadastroUsuario.controller';
import { CadastroUsuarioService } from './cadastroUsuario.service';
import { PrismaService } from '../prisma/prisma.service';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [EmailModule],
  controllers: [CadastroUsuarioController],
  providers: [CadastroUsuarioService, PrismaService],
  exports: [CadastroUsuarioService]
})
export class CadastroUsuarioModule {}
