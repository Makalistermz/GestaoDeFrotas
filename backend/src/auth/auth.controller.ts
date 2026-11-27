import { Controller, Post, HttpCode, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CadastrarUsuarioDto } from './dto/criarUsuario.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

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
