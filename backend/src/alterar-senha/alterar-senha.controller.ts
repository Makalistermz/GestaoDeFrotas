import { Body, Controller, Post } from '@nestjs/common';
import { SolicitarAlteracaoSenhaDto } from './dto/solicitarAlteracaoSenha.dto'; 
import { AlterarSenhaService } from './alterar-senha.service';
import { AlterarSenhaDto } from './dto/alterarSenha.dto';

@Controller('alterar-senha')
export class AlterarSenhaController {
    constructor(private readonly alterarSenhaService: AlterarSenhaService) {}

    @Post('solicitar')
    solicitarTrocaSenha(
        @Body() dados: SolicitarAlteracaoSenhaDto
    ) {
        return this.alterarSenhaService.solicitarTrocaSenha(
            dados
        );
    }

    @Post()
    alterarSenha(
        @Body() dados: AlterarSenhaDto
    ) {
        return this.alterarSenhaService.alterarSenha(
            dados
        );
    }
}
