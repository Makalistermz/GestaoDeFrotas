import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    encontrarPorEmailOuMatricula(login: string) {
        const isEmail = login.includes('@');

        // matrícula é Int: se não for só dígitos, nem consulta o banco
        if (!/^\d+$/.test(login.trim())) return null;
        
        return this.prisma.pessoas.findUnique({
            where: isEmail
             ? { email: login.trim().toLocaleLowerCase() }
             : { matricula: Number(login.trim()) },
        });
    };
}
