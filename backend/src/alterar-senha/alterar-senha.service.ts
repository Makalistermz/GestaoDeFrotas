import { BadRequestException, Injectable } from '@nestjs/common';
import { createHash, randomBytes } from 'crypto';
import { SolicitarAlteracaoSenhaDto } from './dto/solicitarAlteracaoSenha.dto';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';
import { AlterarSenhaDto } from './dto/alterarSenha.dto';
import { compare, hash } from 'bcrypt';

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

    async alterarSenha(dados: AlterarSenhaDto) {

        if (dados.senha !== dados.confirmSenha) {
            throw new BadRequestException("As senhas não coincidem");
        };

        const temMinuscula = /[a-z]/.test(dados.senha);
        const temMaiuscula = /[A-Z]/.test(dados.senha);
        const temNumero = /[0-9]/.test(dados.senha);
        const temEspecial = /[^0-9A-Za-z\s]/.test(dados.senha);

        if (!temMinuscula || !temMaiuscula || !temNumero || !temEspecial) {
            throw new BadRequestException("Insira uma senha mais forte contendo letras maiúsculas, minúsculas, números e símbolos");
        };

        const tokenHash = createHash("sha256")
        .update(dados.token)
        .digest("hex");

        const usuario = await this.prisma.pessoas.findFirst({
            where: {
                token_recuperacao: tokenHash
            },
            select: {
                id: true,
                senha: true,
                token_recuperacao_expira_em: true
            },
        });

        if (!usuario) {
            throw new BadRequestException("O link de recuperação é inválido.");
        };

        const expiracao = usuario.token_recuperacao_expira_em;

        if (!expiracao || expiracao.getTime() <= Date.now()) {
            await this.prisma.pessoas.update({
                where: {
                    id: usuario.id
                },
                data: {
                    token_recuperacao: null,
                    token_recuperacao_expira_em: null
                }
            });

            throw new BadRequestException(
                "O link de recuperação expirou. Solicite um novo link."
            );
        }

        const mesmaSenha = await compare(
            dados.senha,
            usuario.senha
        );

        if (mesmaSenha) {
            throw new BadRequestException("Por motivos de segurança, não use senhas que já foram ultilizadas");
        };

        const novaSenhaHash = await hash(
            dados.senha,
            12
        );

        await this.prisma.pessoas.update({
            where: {
                id: usuario.id
            },
            data: {
                senha: novaSenhaHash,
                token_recuperacao: null,
                token_recuperacao_expira_em: null
            }
        });

        return {
            mensagem: "Sua senha foi redefinida com sucesso."
        };
    };
}
