import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CadastrarUsuarioDto } from './dto/criarUsuario.dto';
import * as bcrypt from 'bcrypt';
import { EmailService } from '../email/email.service';

@Injectable()
export class CadastroUsuarioService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly emailService: EmailService
    ) {}

    async cadastrarUsuario(dados: CadastrarUsuarioDto) {

        const senhaHash = await bcrypt.hash(
            dados.senha,
            12
        );

        const emailMinusculo = dados.email.trim().toLocaleLowerCase();

        const nome = dados.nome.trim()

        const temMaiuscula = /[A-Z]/.test(dados.senha);
        const temNumero = /[0-9]/.test(dados.senha);
        const temEspecial = /[^0-9A-Za-z\s]/.test(dados.senha);
        const temTamanhoMinimo = dados.senha.length >= 8;

        if (!temTamanhoMinimo) {
            throw new BadRequestException("A senha deve ter, no mínimo, 8 caracteres.");
        } else if (!temEspecial) {
            throw new BadRequestException("Adicione pelo menos um caractere especial");
        } else if (!temNumero) {
            throw new BadRequestException("Adicione pelo menos um número");
        } else if (!temMaiuscula) {
            throw new BadRequestException("Adicione pelo menos uma letra maiúscula");
        }

        const emailExistente = await this.prisma.pessoas.findFirst({
            where: {
                email: emailMinusculo
            },
        });

        const cpfExistente = await this.prisma.pessoas.findFirst({
            where: {
                cpf: dados.cpf
            },
        });

        const matriculaExistente = dados.matricula 
         ? await this.prisma.pessoas.findFirst({
            where: {
                matricula: dados.matricula //caso exista matricula null no banco vai retornar que ja exite pessoa com a matricula 
            },
         })
         : null;

        if (emailExistente) {
            throw new BadRequestException("Já existe uma pessoa cadastrada com esse E-mail");
        };

        if (cpfExistente) {
            throw new BadRequestException("Já existe uma pessoa cadastrada com esse CPF");
        };

        if (matriculaExistente) {
            throw new BadRequestException("Já existe uma pessoa cadastrada com essa matricula");
        };

        await this.prisma.pessoas.create({
            data: {
                nome: nome,
                cpf: dados.cpf,
                telefone: dados.telefone,
                matricula: dados.matricula,
                email: emailMinusculo,
                senha: senhaHash,
            }
        });

        await this.emailService.enviarEmailDeCadastro(emailMinusculo, nome);
    };
}
