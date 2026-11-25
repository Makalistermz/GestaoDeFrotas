import { Body, Controller, Post } from '@nestjs/common';
import { SolicitarAlteracaoSenhaDto } from './dto/solicitarAlteracaoSenha.dto'; 
import { AlterarSenhaService } from './alterar-senha.service';

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
}
