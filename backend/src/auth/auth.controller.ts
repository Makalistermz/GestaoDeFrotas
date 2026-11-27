import { Controller, Post, HttpCode, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CadastrarUsuarioDto } from './dto/criarUsuario.dto';
import { LoginDto } from './dto/login.dto';

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
}
