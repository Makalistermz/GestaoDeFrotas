import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CadastrarUsuarioDto } from './dto/criarUsuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CadastroUsuarioService {
    constructor(private prisma: PrismaService) {}

    async cadastrarUsuario(dados: CadastrarUsuarioDto) {

        const senhaHash = await bcrypt.hash(
            dados.senha,
            12
        );

        const emailMinusculo = dados.email.trim().toLocaleLowerCase();

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

        return await this.prisma.pessoas.create({
            data: {
                nome: dados.nome.trim(),
                cpf: dados.cpf,
                telefone: dados.telefone,
                matricula: dados.matricula,
                email: emailMinusculo,
                senha: senhaHash,
            }
        })
    }
}
