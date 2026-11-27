import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { pessoas } from '../generated/prisma/client';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async encontrarPorEmailOuMatricula(login: string): Promise<pessoas | null> {
        const loginLimpo = login.trim();

        if (!loginLimpo) {
            return null;
        }

        const isEmail = loginLimpo.includes('@');

        // 1. Fluxo de E-mail
        if (isEmail) {
            return this.prisma.pessoas.findUnique({
                where: {
                    email: loginLimpo.toLowerCase(),
                },
            });
        }

        // 2. Fluxo de Matrícula (apenas dígitos e dentro do limite de Int 32-bit)
        if (!/^\d+$/.test(loginLimpo)) {
            return null;
        }

        const matriculaNumero = Number(loginLimpo);
        if (!Number.isSafeInteger(matriculaNumero) || matriculaNumero > 2147483647) {
            return null;
        }

        return this.prisma.pessoas.findUnique({
            where: {
                matricula: matriculaNumero,
            },
        });
    }
}