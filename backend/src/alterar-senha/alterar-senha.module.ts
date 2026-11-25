import { Module } from '@nestjs/common';
import { AlterarSenhaController } from './alterar-senha.controller';
import { AlterarSenhaService } from './alterar-senha.service';

@Module({
  controllers: [AlterarSenhaController],
  providers: [AlterarSenhaService],
  exports: [AlterarSenhaService]
})
export class AlterarSenhaModule {}
