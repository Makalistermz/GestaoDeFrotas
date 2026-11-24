import { Module } from '@nestjs/common';
import { CadastroUsuarioController } from './cadastroUsuario.controller';
import { CadastroUsuarioService } from './cadastroUsuario.service';

@Module({
  controllers: [CadastroUsuarioController],
  providers: [CadastroUsuarioService],
  exports: [CadastroUsuarioService]
})
export class CadastroUsuarioModule {}
