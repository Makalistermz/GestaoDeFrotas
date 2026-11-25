import { Injectable } from '@nestjs/common';
import { createHash, randomBytes } from 'crypto';
import { SolicitarAlteracaoSenhaDto } from './dto/solicitarAlteracaoSenha.dto';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';

@Injectable()
export class AlterarSenhaService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly emailService: EmailService
    ) {}

    async solicitarTrocaSenha(dados: SolicitarAlteracaoSenhaDto) {
        const token = randomBytes(32).toString("hex");

        const tokenHash = createHash("sha256")
        .update(token)
        .digest("hex");

        const expiracao = new Date(Date.now() + 60 * 60 * 1000);

        const usuarioSolicitador = await this.prisma.pessoas.findFirst({
            where: {
                email: dados.email
            },
            select: {
                id: true,
                nome: true,
            }
        });

        await this.prisma.pessoas.update({
            where: {
                id: usuarioSolicitador?.id
            },
            data: {
                token_recuperacao: tokenHash,
                token_recuperacao_expira_em: expiracao,
            }
        });

        await this.emailService.enviarTrocaDeSenha(
            dados.email, 
            usuarioSolicitador?.nome ?? '', 
            token
        );
    };
}
