import { Controller, Post, HttpCode, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CadastrarUsuarioDto } from './dto/criarUsuario.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import type { JwtPayload } from './jwt-auth.guard';
import { UsuarioAtual } from './decorators/usuario-atual.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('sing-in')
    @HttpCode(200)
    login(
        @Body() dto: LoginDto
    ) {
        return this.authService.login(dto)
    }

    @Post('sing-up')
    @HttpCode(201)
    cadastrarUsuario(
        @Body() dados: CadastrarUsuarioDto
    ) {
        return this.authService.cadastrarUsuario(
            dados
        );
    };

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    listarPerfil(
        @UsuarioAtual() usuario: JwtPayload
    ) {
        return this.authService.listarPerfil(usuario.sub);
    }
}